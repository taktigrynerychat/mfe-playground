import { AfterViewInit, Directive, ElementRef, HostBinding, inject, Input, OnDestroy } from '@angular/core';
import { FederationPluginMetadata, loadRemoteModule } from './module-federation';
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client';
import { FunctionComponent } from 'react';
import { NavigationService } from '../services/navigation.service';
import { PubSubService } from '../services/pub-sub.service';
import { PubSubTopics } from '../models';

type ComposedProps<P> = P & { navigationService?: NavigationService, pubSubService?: PubSubService };

/**
 * MfeReactComponent is an abstract Angular directive that serves as a dynamic React-based component loader for micro-frontends.
 * It provides the ability to load and render remote React components based on a configuration.
 *
 * @Directive()
 * @typeParam Props - The type of properties to be passed to the React component.
 */
@Directive()
export abstract class MfeReactComponent<Props extends Record<string, unknown> = never> implements AfterViewInit, OnDestroy {
  /**
   * The configuration for the remote component to load.
   */
  abstract configuration: FederationPluginMetadata;
  /**
   * Indicates whether the NavigationService should be provided to the loaded React component.
   */
  abstract useNavigationService: boolean;
  /**
   * Indicates whether the PubSubService should be provided to the loaded React component.
   */
  abstract usePubSubService: boolean;

  private readonly _hostRef: ElementRef = inject(ElementRef);
  private readonly _navigationService: NavigationService = inject(NavigationService);
  private readonly _pubSubService: PubSubService = inject(PubSubService<PubSubTopics>);
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
    this._root.unmount();
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
    const reactElement = React.createElement(this._mfeComponent!, this.getComposedProps(props));
    this._root.render(reactElement);
  }

  private getComposedProps(props: Props): ComposedProps<Props> {
    const composedProps: ComposedProps<Props> = {...(props ?? {})};

    if (this.useNavigationService) {
      composedProps.navigationService = this._navigationService;
    }

    if (this.usePubSubService) {
      composedProps.pubSubService = this._pubSubService;
    }

    return composedProps;
  }

}
