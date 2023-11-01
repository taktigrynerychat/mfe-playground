import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MfeOneComponent } from './components/mfe-one/mfe-one.component';
import { MfeTwoComponent } from './components/mfe-two/mfe-two.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MfeOneComponent,
    MfeTwoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
