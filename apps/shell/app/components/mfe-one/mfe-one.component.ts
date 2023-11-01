import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FederationPluginMetadata, MfeReactComponent } from '../mfe-react-component/mfe-react-component';

@Component({
  selector: 'app-mfe-one',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styleUrls: ['./mfe-one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfeOneComponent extends MfeReactComponent<{name: string}> {
  readonly configuration: FederationPluginMetadata = {
    element: 'App',
    remoteName: 'mfeReact',
    exposedModule: 'App',
    remoteEntry: 'http://localhost:4001/remoteEntry.js'
  };
}
