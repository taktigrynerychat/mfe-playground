import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeReactComponent } from '../../../mfe-utils/mfe-react-component';
import { FederationPluginMetadata } from '../../../mfe-utils/module-federation';
import { MFE_REGISTRY } from '../../../constants';

export type ReactCounterProps = {
  count: number;
  onCountChange: (count: number) => void;
}

@Component({
  selector: 'app-mfe-react-counter',
  standalone: true,
  template: '',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfeReactCounterComponent extends MfeReactComponent<ReactCounterProps> {
  readonly configuration: FederationPluginMetadata = MFE_REGISTRY.ReactCounter;
  readonly usePubSubService: boolean = false;
  readonly useNavigationService: boolean = false;
}
