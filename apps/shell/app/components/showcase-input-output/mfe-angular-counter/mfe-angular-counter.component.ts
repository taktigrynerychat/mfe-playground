import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeAngularComponent } from '../../../mfe-utils/mfe-angular-component';
import { FederationPluginMetadata } from '../../../mfe-utils/module-federation';
import { MFE_REGISTRY } from '../../../constants';

export type AngularCounterProps = {
  count: number;
  countChange: EventEmitter<number>;
}
@Component({
  selector: 'app-mfe-angular-counter',
  standalone: true,
  template: '<ng-container #container></ng-container>',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfeAngularCounterComponent extends MfeAngularComponent<AngularCounterProps>{
  readonly configuration: FederationPluginMetadata = MFE_REGISTRY.AngularCounter

  @ViewChild('container', { static: true, read: ViewContainerRef })
  readonly viewContainerRef!: ViewContainerRef;

}
