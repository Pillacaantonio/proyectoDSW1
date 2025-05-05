import { Component, inject } from '@angular/core';
import { TaskService } from '../../data-access/task.service';
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { RouterModule } from '@angular/router';  // Importar RouterModule

@Component({
  selector: 'app-task-list',  // Asegúrate de que el selector coincida
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, FooterComponent, RouterModule],  // Incluir RouterModule
  templateUrl: './task.list.component.html',
  providers: [TaskService],
})
export default class TaskListComponent {
  
  tasksService = inject(TaskService);

}
