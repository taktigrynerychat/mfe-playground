import { v4 as uuid } from "uuid";
import { Inject, Injectable } from '@angular/core';
import { PUB_SUB_TOPICS } from '../modules/pubsub.module';
import { PubSubTopics } from '../models';

type ID = string;
type Message = Record<string, any>;
type OnMessageFn<M extends Record<string, any>> = (message: M) => any;

@Injectable()
export class PubSubService<Topics extends Record<string, Message> = PubSubTopics> {
  private _topics: Record<keyof Topics, ID[]> = {} as Record<keyof Topics, ID[]>;
  private _subscriberOnMsg: Record<ID, OnMessageFn<Topics[keyof Topics]>> = {};
  private _subscriberTopics: Record<ID, keyof Topics> = {};
  private _persistedMessages: Record<keyof Topics, Topics[keyof Topics]> = {} as Record<keyof Topics, Topics[keyof Topics]>;

  constructor(@Inject(PUB_SUB_TOPICS) private readonly _registeredTopics: (keyof Topics)[]) {
    this._registeredTopics.forEach(topic => this._topics[topic] = []);
  }

  public subscribe<TopicKey extends keyof Topics>(topic: TopicKey, onMessage: OnMessageFn<Topics[TopicKey]>): ID {
    if(!(topic in this._topics)) {
      throw new Error(`There is no such "${topic as string}" registered`)
    }
    const subID: ID = uuid();
    this._topics[topic].push(subID);

    this._subscriberOnMsg[subID] = onMessage as OnMessageFn<Topics[keyof Topics]>;
    this._subscriberTopics[subID] = topic;

    if (topic in this._persistedMessages) {
      onMessage(this._persistedMessages[topic] as Topics[TopicKey]);
    }

    return subID;
  }

  public unsubscribe(id: ID): void {
    if (id in this._subscriberOnMsg && id in this._subscriberTopics) {
      delete this._subscriberOnMsg[id];
      const topic = this._subscriberTopics[id];

      if (topic && topic in this._topics) {
        const idx = this._topics[topic].findIndex((tID) => tID === id);
        if (idx > -1) {
          this._topics[topic].splice(idx, 1);
        }
      }

      delete this._subscriberTopics[id];
    }
  }

  public publish<K extends keyof Topics>(topic: K, message: Topics[K]): void {
    if(!(topic in this._topics)) {
      throw new Error(`There is no such "${topic as string}" registered`)
    }

    const subIDs = this._topics[topic];
    subIDs.forEach((id) => {
      if (id in this._subscriberOnMsg) {
        this._subscriberOnMsg[id](message);
      }
    });

    this._persistedMessages[topic] = message;
  }
}


