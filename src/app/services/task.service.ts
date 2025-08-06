import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Complete Angular Project',
      description: 'Finish the task manager application',
      duedate: new Date('2025-08-06'),
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'Register for Vibe Coding',
      description: 'I have to register for vibe coding and should add necessary details',
      duedate: new Date('2025-08-06'),
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Go to GYM',
      description: 'I have to go to gym by sharp 7:30PM',
      duedate: new Date('2025-08-06'),
      status: 'Have To Do'
    }
  ];
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  constructor() {}
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }
  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }
  addTask(task: Omit<Task, 'id'>): void {
    const newId = this.tasks.length > 0 ? 
      Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
    const newTask: Task = {
      ...task,
      id: newId
    };
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);
  }
  updateTask(updatedTask: Task): void {
    this.tasks = this.tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksSubject.next(this.tasks);
  }
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks);
  }
}
