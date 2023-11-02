import { Component } from '@angular/core';
import { MfeAngularOutputs } from '../utils/mfe-angular-component';
import { MfeTwoTargetComponent } from './components/mfe-two/mfe-two.component';

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

  onOutput(event: MfeAngularOutputs<MfeTwoTargetComponent>): void {
    switch (event.type) {
      case 'onClick': {
        console.log(event.value)
      }
    }
  }
}
