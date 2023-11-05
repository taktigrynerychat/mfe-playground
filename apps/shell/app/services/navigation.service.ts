import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * A service for managing app navigation.
 */
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private readonly _router: Router) {}

  /**
   * Navigates to a specified route using the provided navigation commands.
   * @param commands - An array of route commands to navigate to.
   */
  public navigateTo(commands: Primitive[]): void {
    this._router.navigate(commands);
  }
}
