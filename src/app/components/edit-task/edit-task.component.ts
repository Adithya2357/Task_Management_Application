import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskId!: number;
  taskNotFound = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      duedate: ['', Validators.required],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.taskId = +params['id'];
        const task = this.taskService.getTaskById(this.taskId);

        if (task) {
          const dueDateString = task.duedate.toISOString().split('T')[0];

          this.taskForm.setValue({
            title: task.title,
            description: task.description,
            duedate: dueDateString,
            status: task.status,
          });
        } else {
          this.taskNotFound = true;
        }
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid && !this.taskNotFound) {
      const formValue = this.taskForm.value;

      const updatedTask: Task = {
        id: this.taskId,
        ...formValue,
        duedate: new Date(formValue.duedate),
      };

      this.taskService.updateTask(updatedTask);
      this.router.navigate(['/tasks']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}
