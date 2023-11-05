import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs';

@Component({
  selector: 'mfe-ng-pub-sub-feature',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './pub-sub-feature.component.html',
  styleUrls: ['./pub-sub-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PubSubFeatureComponent {
  constructor(
    @Inject('PUB_SUB') private readonly _pubSub: PubSubService,
    private readonly _http: HttpClient,
  ) {}

  public publishMessage(): void {
    this._http.get<string[]>('https://random-word-api.herokuapp.com/word')
        .pipe(take(1))
        .subscribe(([randomWord]) => this._pubSub.publish('customEvent', { randomWord }));
  }
}
