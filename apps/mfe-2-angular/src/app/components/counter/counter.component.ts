import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mfe-ng-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  public get log(): string {
    console.log('check')
    return 'asdasd'
  }
  @Input()
  public readonly count!: number;

  @Output()
  public readonly countChange: EventEmitter<number> = new EventEmitter<number>();
}
