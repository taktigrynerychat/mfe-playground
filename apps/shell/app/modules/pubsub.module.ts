import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { PubSubService } from '../services/pub-sub.service';

export const PUB_SUB_TOPICS = new InjectionToken<string[]>('Topics');

/**
 * A module for managing and providing PubSub functionality.
 */
@NgModule()
export class PubSubModule {
  /**
   * Creates a module with providers for specific PubSub topics.
   * @param topics - An array of topic names for PubSub.
   * @returns A `ModuleWithProviders` configuration for the PubSubModule.
   */
  public static forTopics<Topic extends string = string>(topics: Topic[] = []): ModuleWithProviders<PubSubModule> {
    return {
      ngModule: PubSubModule,
      providers: [
        PubSubService,
        {
          provide: PUB_SUB_TOPICS,
          useValue: topics
        },
        {
          provide: 'PUB_SUB',
          useExisting: PubSubService,
        }
      ]
    }
  }
}
