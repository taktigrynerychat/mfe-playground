declare type Primitive = number | boolean | string;

declare interface NavigationService {
  navigateTo(commands: Primitive[]): void;
}
