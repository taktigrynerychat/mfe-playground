import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeReactComponent } from '../../../../utils/mfe-react-component';
import { FederationPluginMetadata } from '../../../../utils/module-federation';
import { MFE_REGISTRY } from '../../../constants';

@Component({
  selector: 'app-mfe-react-pub-sub-feature',
  standalone: true,
  imports: [CommonModule],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfeReactPubSubFeatureComponent extends MfeReactComponent {
  public readonly configuration: FederationPluginMetadata = MFE_REGISTRY.ReactPubSubFeature;
  public readonly useNavigationService: boolean = false;
  public readonly usePubSubService: boolean = true;
}
