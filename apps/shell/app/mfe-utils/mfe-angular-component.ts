import {
  AfterViewInit, ChangeDetectorRef, ComponentMirror, ComponentRef, DestroyRef,
  Directive, EventEmitter,
  HostBinding, inject, Input, Output, reflectComponentType,
  ViewContainerRef
} from '@angular/core';
import { FederationPluginMetadata, loadRemoteModule } from './module-federation';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, merge, Observable, tap } from 'rxjs';

export type MfeAngularInputs<T> = {
  [K in keyof T as T[K] extends EventEmitter<any> ? never : K]: T[K]
}

export type MfeAngularOutputs<T> = {
  [K in keyof T]: T[K] extends EventEmitter<infer E> ? { type: K, value: E } : never;
}[keyof T];

type ComponentProps = Record<string, unknown>;

@Directive()
export abstract class MfeAngularComponent<Component extends ComponentProps> implements AfterViewInit {
  abstract configuration: FederationPluginMetadata;
  abstract viewContainerRef: ViewContainerRef;

  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  @HostBinding('class.mfe') private readonly _mfe: boolean = true;
  @HostBinding('attr.data-framework') private readonly _framework: string = 'angular';

  private _mfeComponent!: new () => Component;
  private _componentRef!: ComponentRef<Component>;
  private _componentMetadata!: ComponentMirror<Component> | null;
  private _inputs!: MfeAngularInputs<Component>;
  private _cdr!: ChangeDetectorRef;

  @Output() outputs: EventEmitter<MfeAngularOutputs<Component>> = new EventEmitter();

  @Input()
  public set inputs(inputs: MfeAngularInputs<Component>) {
    this._inputs = inputs;
    this.setInputs();
  }
  public get inputs(): MfeAngularInputs<Component> {
    return this._inputs;
  }

  private get componentInstance(): Component {
    return this._componentRef?.instance;
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

    this._mfeComponent = (await loadRemoteModule({
      remoteEntry,
      remoteName,
      exposedModule,
    }))[element];

    this.render();
  }

  private render(): void {
    this.viewContainerRef.clear();
    this._componentRef = this.viewContainerRef.createComponent(this._mfeComponent);
    this._cdr = this._componentRef.injector.get(ChangeDetectorRef);
    this._componentMetadata = reflectComponentType(this._mfeComponent);
    this.setInputs();
    this.registerOutputs();
    this._cdr.markForCheck();
  }

  private setInputs(): void {
    if (this.componentInstance && this._inputs) {
      Object.entries(this._inputs).forEach(([key, value]) => {
        if (this._componentMetadata?.inputs.some((input) => input.propName === key)) {
          (this.componentInstance as ComponentProps)[key] = value;
        } else {
          console.warn(`There is no "${key}" property in the target ${this.configuration.element}`);
        }
      })
      this._cdr.markForCheck();
    }
  }

  private registerOutputs(): void {
    if (this._componentMetadata?.outputs) {
      const sources$ = this._componentMetadata.outputs.reduce((acc, { propName }) => {
        const property = this.componentInstance[propName];
        return this.isEventEmitter(property)
          ? [...acc, property.asObservable().pipe(map(value => ({ type: propName, value } as MfeAngularOutputs<Component>)))]
          : acc;
      }, [] as Observable<MfeAngularOutputs<Component>>[]);

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
