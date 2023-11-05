import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { PubSubService } from '../services/pub-sub.service';

export const PUB_SUB_TOPICS = new InjectionToken<string[]>('Topics');

@NgModule()
export class PubSubModule {
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
