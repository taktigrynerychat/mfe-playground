import { Component, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeAngularComponent } from '../../../../utils/mfe-angular-component';
import { FederationPluginMetadata } from '../../../../utils/module-federation';
import { MFE_REGISTRY } from '../../../constants';

export type CounterComponentProps = {
  count: number;
  countChange: EventEmitter<number>;
}
@Component({
  selector: 'app-mfe-angular-counter',
  standalone: true,
  template: '<ng-container #container></ng-container>',
  imports: [CommonModule],
})
export class MfeAngularCounterComponent extends MfeAngularComponent<CounterComponentProps>{
  readonly configuration: FederationPluginMetadata = MFE_REGISTRY.AngularCounter;

  @ViewChild('container', { static: true, read: ViewContainerRef })
  readonly viewContainerRef!: ViewContainerRef;

}
