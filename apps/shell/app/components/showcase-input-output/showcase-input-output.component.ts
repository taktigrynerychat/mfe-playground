import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularCounterProps, MfeAngularCounterComponent } from './mfe-angular-counter/mfe-angular-counter.component';
import { MfeAngularInputs, MfeAngularOutputs } from '../../../utils/mfe-angular-component';
import { MfeReactCounterComponent, ReactCounterProps } from './mfe-react-counter/mfe-react-counter.component';

@Component({
  selector: 'app-showcase-input-output',
  standalone: true,
  imports: [CommonModule, MfeAngularCounterComponent, MfeReactCounterComponent],
  templateUrl: './showcase-input-output.component.html',
  styleUrls: ['./showcase-input-output.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'showcase-input-output'
  }
})
export class ShowcaseInputOutputComponent {
  constructor(private readonly cdr: ChangeDetectorRef) {}

  public angularCounterProps: MfeAngularInputs<AngularCounterProps> = {
    count: 0,
  }

  public reactCounterProps: ReactCounterProps = {
    count: 0,
    onCountChange: this.onReactCounterChange.bind(this),
  }

  public setAngularCounter(count: number): void {
    this.angularCounterProps = { count };
  }

  public setReactCounter(count: number): void {
    this.reactCounterProps = { ...this.reactCounterProps, count };
  }

  public onAngularCounterChange(event: MfeAngularOutputs<AngularCounterProps>): void {
    this.setAngularCounter(event.value);
  }

  private onReactCounterChange(count: number): void {
    this.setReactCounter(count);
    this.cdr.markForCheck();
  }
}
