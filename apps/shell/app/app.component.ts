import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  props = {name: 'Vlad', surname: 'Rusakov'};
  counter = 0;
  public updateName(): void {
    this.props = { ...this.props, name: `Vlad ${++this.counter}`};
  }

  onOutput(event: any): void {
    console.log(event);
  }
}
