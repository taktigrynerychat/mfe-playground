import { AfterViewInit, Directive, ElementRef, HostBinding, inject, Input, OnDestroy } from '@angular/core';
import { loadRemoteModule, LoadRemoteModuleOptions } from '../../../utils/module-federation';
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';

export interface FederationPluginMetadata extends LoadRemoteModuleOptions {
  element: string
}

@Directive()
export abstract class MfeReactComponent<Props extends Record<string, unknown> = never> implements AfterViewInit, OnDestroy {
  abstract configuration: FederationPluginMetadata;

  private readonly _hostRef = inject(ElementRef);
  private readonly _root = createRoot(this._hostRef.nativeElement);

  private _props!: Props;
  private _mfeModule!: any;

  @HostBinding('class.mfe') private readonly _mfe: boolean = true;
  @HostBinding('attr.data-framework') private readonly _framework: string = 'react';

  @Input()
  public set props(props: Props) {
    this._props = props;

    if (this._mfeModule) {
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

    this._mfeModule = (await loadRemoteModule({
      remoteEntry,
      remoteName,
      exposedModule,
    }))[element];

    this.render(props);
  }

  private render(props: Record<string, unknown>): void {
    const reactElement = React.createElement(this._mfeModule, { ...(props ?? {}) })
    this._root.render(reactElement);
  }

}
