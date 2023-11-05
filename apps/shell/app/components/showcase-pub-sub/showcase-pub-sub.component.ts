import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeAngularPubSubFeatureComponent } from './mfe-angular-pub-sub-feature/mfe-angular-pub-sub-feature.component';
import { MfeReactPubSubFeatureComponent } from './mfe-react-pub-sub-feature/mfe-react-pub-sub-feature.component';

@Component({
  selector: 'app-showcase-pub-sub',
  standalone: true,
  imports: [CommonModule, MfeAngularPubSubFeatureComponent, MfeReactPubSubFeatureComponent],
  templateUrl: './showcase-pub-sub.component.html',
  styleUrls: ['./showcase-pub-sub.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'showcase-pub-sub showcase-page'
  }
})
export class ShowcasePubSubComponent {
}
