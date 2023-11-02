import {
  AfterViewInit, ComponentMirror, ComponentRef, DestroyRef,
  Directive, EventEmitter,
  HostBinding, inject, Input, Output, reflectComponentType,
  ViewContainerRef
} from '@angular/core';
import { FederationPluginMetadata, loadRemoteModule } from './module-federation';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, merge, Observable, tap } from 'rxjs';

@Directive()
export abstract class MfeAngularComponent implements AfterViewInit {
  abstract configuration: FederationPluginMetadata;
  abstract viewContainerRef: ViewContainerRef;
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  @HostBinding('class.mfe') private readonly _mfe: boolean = true;
  @HostBinding('attr.data-framework') private readonly _framework: string = 'angular';

  private _mfeModule: any;
  private _componentRef!: ComponentRef<Record<string, unknown>>;
  private _componentMetadata!: ComponentMirror<unknown> | null;
  private _inputs!: Record<string, any>;

  @Output() outputs: EventEmitter<{ event: string, value: any }> = new EventEmitter();

  @Input()
  public set inputs(inputs: Record<string, any>) {
    this._inputs = inputs;
    this.setInputs();
  }

  public get inputs(): Record<string, any> {
    return this._inputs;
  }

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
    this.viewContainerRef.clear();
    this._componentRef = this.viewContainerRef.createComponent(this._mfeModule);
    this._componentMetadata = reflectComponentType(this._mfeModule);
    this.setInputs();
    this.registerOutputs();
  }

  private setInputs(): void {
    if (this._componentRef?.instance && this._inputs) {
      Object.entries(this._inputs).forEach(([key, value]) => {
        if (this._componentMetadata?.inputs.some((input) => input.propName === key)) {
          this._componentRef.instance[key] = value;
        } else {
          console.warn(`There is no "${key}" property in the target ${this.configuration.element}`);
        }
      })
      this._componentRef.changeDetectorRef.markForCheck();
    }
  }

  private registerOutputs(): void {
    if (this._componentMetadata?.outputs) {
      const sources$ = this._componentMetadata.outputs.reduce((acc, { propName }) => {
        const property = this._componentRef.instance[propName];
        return this.isEventEmitter(property)
          ? [...acc, property.asObservable().pipe(map(value => ({ event: propName, value })))]
          : acc;
      }, [] as Observable<{event: string, value: unknown}>[]);

      merge(...sources$)
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          tap(event => {
            this.outputs.emit(event);
          })
        )
        .subscribe();
    }
  }

  private isEventEmitter(property: unknown): property is EventEmitter<unknown> {
    return property instanceof EventEmitter;
  }

}
