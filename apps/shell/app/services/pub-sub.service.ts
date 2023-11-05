import { v4 as uuid } from "uuid";
import { Inject, Injectable } from '@angular/core';
import { PUB_SUB_TOPICS } from '../modules/pubsub.module';

type ID = string;
type Message = Record<string, unknown>;
type OnMessageFn = (message: Message) => any;

@Injectable()
export class PubSubService<Topic extends string = string> {
  private _topics: Record<Topic, ID[]> = {} as Record<Topic, ID[]>;
  private _subscriberOnMsg: Record<ID, OnMessageFn> = {};
  private _subscriberTopics: Record<ID, Topic> = {};
  private _persistedMessages: Record<Topic, Message> = {} as Record<Topic, Message>;

  constructor(@Inject(PUB_SUB_TOPICS) private readonly _registeredTopics: Topic[]) {
    this._registeredTopics.forEach(topic => this._topics[topic] = []);
  }

  public subscribe(topic: Topic, onMessage: OnMessageFn): ID {
    const subID: ID = uuid();
    this._topics[topic].push(subID);

    this._subscriberOnMsg[subID] = onMessage;
    this._subscriberTopics[subID] = topic;

    if (topic in this._persistedMessages) {
      onMessage(this._persistedMessages[topic]);
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
        if (this._topics[topic].length === 0) {
          delete this._topics[topic];
        }
      }

      delete this._subscriberTopics[id];
    }
  }

  public publish(topic: Topic, message: Record<string, unknown>) {
    if (topic in this._topics) {
      const subIDs = this._topics[topic];
      subIDs.forEach((id) => {
        if (id in this._subscriberOnMsg) {
          this._subscriberOnMsg[id](message);
        }
      });
    }
    this._persistedMessages[topic] = message;
  }
}


