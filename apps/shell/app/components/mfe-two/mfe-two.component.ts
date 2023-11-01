import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadRemoteModule } from '../../../utils/module-federation';

@Component({
  selector: 'app-mfe-two',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styleUrls: ['./mfe-two.component.scss']
})
export class MfeTwoComponent implements AfterViewInit {
  private readonly _hostRef = inject(ElementRef);
  async ngAfterViewInit(): Promise<void> {
    const component = await loadRemoteModule({
      remoteEntry: 'http://localhost:4002/remoteEntry.js',
      remoteName: 'mfeAngular',
      exposedModule: 'ExposedComponent',
    })
    console.log(component);
  }

}
