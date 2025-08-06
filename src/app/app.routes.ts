import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: NewTaskComponent },
  { path: 'tasks/edit/:id', component: EditTaskComponent },
];
