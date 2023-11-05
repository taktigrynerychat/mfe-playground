import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeAngularComponent } from '../../../../utils/mfe-angular-component';
import { FederationPluginMetadata } from '../../../../utils/module-federation';
import { MFE_REGISTRY } from '../../../constants';

@Component({
  selector: 'app-mfe-angular-pub-sub-feature',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-container #container></ng-container>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfeAngularPubSubFeatureComponent extends MfeAngularComponent<any> {
  public readonly configuration: FederationPluginMetadata = MFE_REGISTRY.AngularPubSubFeature;

  @ViewChild('container', { static: true, read: ViewContainerRef })
  readonly viewContainerRef!: ViewContainerRef;
}
