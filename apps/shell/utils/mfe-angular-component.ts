import {
  AfterViewInit,
  Directive,
  HostBinding,
  ViewContainerRef
} from '@angular/core';
import { FederationPluginMetadata, loadRemoteModule } from './module-federation';

@Directive()
export abstract class MfeAngularComponent implements AfterViewInit {
  abstract configuration: FederationPluginMetadata;
  abstract viewContainerRef: ViewContainerRef;

  @HostBinding('class.mfe') private readonly _mfe: boolean = true;
  @HostBinding('attr.data-framework') private readonly _framework: string = 'angular';

  private _mfeModule: any;

  public ngAfterViewInit(): void {
    if (this.configuration) {
      this.load(this.configuration)
    }
  }

  private async load(config: FederationPluginMetadata): Promise<void> {
    this.configuration = config;
    const {
      element,
      remoteName,
      remoteEntry,
      exposedModule
    } = config;

    this._mfeModule = (await loadRemoteModule({
      remoteEntry,
      remoteName,
      exposedModule,
    }))[element];

    this.render();
  }

  private render(): void {
    this.viewContainerRef.createComponent(this._mfeModule);
  }

}
