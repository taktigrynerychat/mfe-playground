import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MfeHeaderComponent } from './components/mfe-header/mfe-header.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { PubSubModule } from './modules/pubsub.module';
import { ROOT_ROUTES } from './constants';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(ROOT_ROUTES),
    PubSubModule.forTopics(['message']),
    BrowserModule,
    MfeHeaderComponent,
    HomeComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
