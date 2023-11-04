import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeReactComponent } from '../../../../utils/mfe-react-component';
import { FederationPluginMetadata } from '../../../../utils/module-federation';
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
}
