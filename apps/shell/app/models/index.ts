import { PubSubTopic } from '../constants';

export type PubSubTopics = {
  [PubSubTopic.CountChange]: { previousCount: number, currentCount: number };
}
