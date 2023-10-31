import { Component, OnInit } from '@angular/core';
import { loadRemoteModule } from '../utils/module-federation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  props = {name: 'Vlad'};
  counter = 0;
  public updateName(): void {
    this.props = { name: `Vlad ${++this.counter}`};
  }
}
