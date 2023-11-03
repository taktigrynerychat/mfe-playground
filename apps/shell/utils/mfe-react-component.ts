import { AfterViewInit, Directive, ElementRef, HostBinding, inject, Input, OnDestroy } from '@angular/core';
import { FederationPluginMetadata, loadRemoteModule } from './module-federation';
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createRoot, Root } from 'react-dom/client';
import { FunctionComponent } from 'react';
import { NavigationService } from '../app/services/navigation.service';

@Directive()
export abstract class MfeReactComponent<Props extends Record<string, unknown> = never> implements AfterViewInit, OnDestroy {
  abstract configuration: FederationPluginMetadata;

  private readonly _hostRef: ElementRef = inject(ElementRef);
  private readonly _navigationService: NavigationService = inject(NavigationService);
  private readonly _root: Root = createRoot(this._hostRef.nativeElement);

  private _props!: Props;
  private _mfeComponent!: FunctionComponent<Props> | undefined;

  @HostBinding('class.mfe') private readonly _mfe: boolean = true;
  @HostBinding('attr.data-framework') private readonly _framework: string = 'react';

  @Input()
  public set props(props: Props) {
    this._props = props;

    if (this._mfeComponent) {
      this.render(props);
    }
  }

  public get props(): Props {
    return this._props;
  }

  public ngAfterViewInit(): void {
    if (this.configuration) {
      this.load(this.configuration, this.props)
    }
  }

  public ngOnDestroy(): void {
    ReactDOM.unmountComponentAtNode(this._hostRef.nativeElement);
  }

  private async load(config: FederationPluginMetadata, props: Props): Promise<void> {
    this.configuration = config;
    const {
      element,
      remoteName,
      remoteEntry,
      exposedModule
    } = config;

    this._mfeComponent = (await loadRemoteModule({
      remoteEntry,
      remoteName,
      exposedModule,
    }))[element];

    this.render(props);
  }

  private render(props: Props): void {
    const reactElement = React.createElement(this._mfeComponent!, { ...(props ?? {}), navigationService: this._navigationService })
    this._root.render(reactElement);
  }

}
