import { Component, OnInit } from '@angular/core';
import { loadRemoteModule } from '../utils/module-federation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shell';

  ngOnInit(): void {
    try {
      loadRemoteModule({
        remoteName: 'mfeReact',
        exposedModule: './App',
        remoteEntry: 'http://localhost:4001/remoteEntry.js'
      })
    } catch (e) {
      console.log(e)
    }
  }
}
