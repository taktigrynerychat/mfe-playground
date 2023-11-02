import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mfe-ng-exposed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exposed.component.html',
  styleUrls: ['./exposed.component.scss']
})
export class ExposedComponent {
  @Input()
  public readonly name!: string;

  @Output()
  public readonly onClick = new EventEmitter<any>
}