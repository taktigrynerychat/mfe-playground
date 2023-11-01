import {
  ChangeDetectionStrategy,
  Component, ViewChild, ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FederationPluginMetadata } from '../../../utils/module-federation';
import { MfeAngularComponent } from '../../../utils/mfe-angular-component';

@Component({
  selector: 'app-mfe-two',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-container #container></ng-container>',
  styleUrls: ['./mfe-two.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfeTwoComponent extends MfeAngularComponent {
  public readonly configuration: FederationPluginMetadata = {
    remoteEntry: 'http://localhost:4002/remoteEntry.js',
    remoteName: 'mfeAngular',
    exposedModule: 'ExposedComponent',
    element: 'ExposedComponent'
  };

  @ViewChild('container', { static: true, read: ViewContainerRef })
  public readonly viewContainerRef!: ViewContainerRef;
}
