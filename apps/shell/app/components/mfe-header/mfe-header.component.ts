import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeReactComponent } from '../../mfe-utils/mfe-react-component';
import { FederationPluginMetadata } from '../../mfe-utils/module-federation';
import { MFE_REGISTRY } from '../../constants';

export type HeaderProps = {
  logoUrl: string;
  links: { title: string, link: string }[];
}
@Component({
  selector: 'app-mfe-header',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styleUrls: ['./mfe-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mfe-header'
  }
})
export class MfeHeaderComponent extends MfeReactComponent<HeaderProps> {
  readonly configuration: FederationPluginMetadata = MFE_REGISTRY.Header;
  readonly useNavigationService: boolean = true;
  readonly usePubSubService: boolean = false;
}
