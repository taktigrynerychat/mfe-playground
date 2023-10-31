import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MfeOneComponentComponent } from './components/mfe-one-component/mfe-one-component.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MfeOneComponentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
