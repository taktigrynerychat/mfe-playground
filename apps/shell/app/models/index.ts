import { PubSubTopic } from '../constants';

export type PubSubTopics = {
  [PubSubTopic.CustomEvent]: { randomWord: string };
}
