import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponentProps, MfeAngularCounterComponent } from './mfe-angular-counter/mfe-angular-counter.component';
import { MfeAngularInputs, MfeAngularOutputs } from '../../../utils/mfe-angular-component';

@Component({
  selector: 'app-showcase-input-output',
  standalone: true,
  imports: [CommonModule, MfeAngularCounterComponent],
  templateUrl: './showcase-input-output.component.html',
  styleUrls: ['./showcase-input-output.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'showcase-input-output'
  }
})
export class ShowcaseInputOutputComponent {
  public angularCounterProps: MfeAngularInputs<CounterComponentProps> = {
    count: 0,
  }

  public setAngularCounter(count: number): void {
    this.angularCounterProps = { count };
  }

  public onAngularCounterChange(event: MfeAngularOutputs<CounterComponentProps>): void {
    this.setAngularCounter(event.value);
  }

}
