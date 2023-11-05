declare type Primitive = number | boolean | string;

declare interface NavigationService {
  navigateTo(commands: Primitive[]): void;
}

type ID = string;
type Message = Record<string, any>;
type OnMessageFn<M extends Record<string, any>> = (message: M) => any;

type PubSubTopics = {
  customEvent: { randomWord: string }
}

declare interface PubSubService<Topics extends Record<string, Message> = PubSubTopics> {
  subscribe<TopicKey extends keyof Topics>(topic: TopicKey, onMessage: OnMessageFn<Topics[TopicKey]>): ID;
  unsubscribe(id: ID): void;
  publish<K extends keyof Topics>(topic: K, message: Topics[K]): void;
}
