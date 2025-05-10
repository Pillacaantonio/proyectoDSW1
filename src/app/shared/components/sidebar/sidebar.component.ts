import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
isSidebarOpen = false;
toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Alterna el estado del sidebar
  }
logOut() {
throw new Error('Method not implemented.');
}

}
