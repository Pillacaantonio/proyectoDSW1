import { Component, effect, input } from '@angular/core';
import { Task } from '../../data-access/task.service';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";
import { HeaderComponent } from "../../../shared/components/header/header.component";

@Component({
  selector: 'app-table',
  standalone:true,
    templateUrl: './table.component.html',
    imports: [],
 })
export class TableComponent {
  tasks = input.required<Task[]>();

  
}
