import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthStateService } from '../data-access/auth-state.service';
 
@Component({
  standalone: true,
  imports:[RouterModule,RouterLink],
  selector: 'app-layout',
  template: `
<header class="h-[200px] mb-8 w-full px-4 bg-[#0e4d34]">
<nav class="flex items-center justify-between h-full w-full">
    <a class="text-2xl font-bold text-white" routerLink="/tasks">Ng Task</a>
    <button
  type="button"
  class="text-black bg-white hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-black-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm p-2 text-center me-2 mb-2 ml-auto flex items-center mt-[-80px]"
  (click)="logOut()"
>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-500">
    <path d="M7 4C4.58803 5.66502 3 8.50052 3 11.7185C3 16.8445 7.02944 21 12 21C16.9706 21 21 16.8445 21 11.7185C21 8.50052 19.412 5.66502 17 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="my-path"></path>
    <path d="M12 3L12 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="my-path"></path>
  </svg>
</button>
  </nav>
</header>
<router-outlet />

`,
})
export default class LayoutComponent {
  private _authState = inject(AuthStateService);
  private _router = inject(Router);

  async logOut() {
    await this._authState.logOut();
    this._router.navigateByUrl('/auth/sign-in');
  }
}
