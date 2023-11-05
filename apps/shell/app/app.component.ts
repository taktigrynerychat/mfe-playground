import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderProps } from './components/mfe-header/mfe-header.component';
import { HEADER_PROPS } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly headerProps: HeaderProps = HEADER_PROPS;
}
