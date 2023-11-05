import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mfe-ng-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  @Input()
  public count!: number;

  @Output()
  public readonly countChange: EventEmitter<number> = new EventEmitter<number>();
}
