import { FederationPluginMetadata } from '../../utils/module-federation';
import { HeaderProps } from '../components/mfe-header/mfe-header.component';
import { Routes } from '@angular/router';

export const MFE_REGISTRY = {
  Header: {
    element: 'Header',
    remoteName: 'mfeReact',
    exposedModule: 'Header',
    remoteEntry: 'http://localhost:4001/remoteEntry.js'
  },
  AngularCounter: {
    element: 'CounterComponent',
    remoteName: 'mfeAngular',
    exposedModule: 'Counter',
    remoteEntry: 'http://localhost:4002/remoteEntry.js'
  },
  ReactCounter: {
    element: 'Counter',
    remoteName: 'mfeReact',
    exposedModule: 'Counter',
    remoteEntry: 'http://localhost:4001/remoteEntry.js'
  },
} as const satisfies Record<string, FederationPluginMetadata>;

export const HEADER_PROPS: HeaderProps = {
  links: [
    { title: 'Home', link: 'home' },
    { title: 'I/O Showcase', link: 'showcase/input-output' },
    { title: 'Event Bus Showcase ', link: 'showcase/event-bus' }
  ],
  logoUrl: 'https://angular.io/assets/images/logos/angular/angular_solidBlack.svg'
};

export const ROOT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('../components/home/home.component').then(m => m.HomeComponent)
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
        loadComponent: () => import('../components/showcase-input-output/showcase-input-output.component').then(m => m.ShowcaseInputOutputComponent)
      },
      {
        path: 'event-bus',
        loadComponent: () => import('../components/showcase-event-bus/showcase-event-bus.component').then(m => m.ShowcaseEventBusComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]

export enum PubSubTopic {
  CountChange = 'countChange'
}
