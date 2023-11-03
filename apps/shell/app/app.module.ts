import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MfeHeaderComponent } from './components/mfe-header/mfe-header.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';

const rootRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'showcase',
    children: [
      {
        path: '',
        redirectTo: 'input-output',
        pathMatch: 'full'
      },
      {
        path: 'input-output',
        loadComponent: () => import('./components/showcase-input-output/showcase-input-output.component').then(m => m.ShowcaseInputOutputComponent)
      },
      {
        path: 'event-bus',
        loadComponent: () => import('./components/showcase-event-bus/showcase-event-bus.component').then(m => m.ShowcaseEventBusComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(rootRoutes),
    BrowserModule,
    MfeHeaderComponent,
    HomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
