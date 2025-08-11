import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly a = 'tasks';
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  constructor() {
    this.loadTasks();
  }
  private loadTasks(): void {
    const tasksJson =localStorage.getItem(this.a);
    if (tasksJson){
    const tasksFromStorage: Task[] = JSON.parse(tasksJson);
      const loadedTasks: Task[] = [];
      for (let i = 0; i < tasksFromStorage.length; i++) {
        const task =tasksFromStorage[i];
      loadedTasks.push({
          id: task.id,
          title: task.title,
          description: task.description,
          duedate: new Date(task.duedate),
          status: task.status
        });
      }
      this.tasks =loadedTasks;
    } else {
      this.tasks = this.getDefaultTasks();
      this.saveTasks();
    }
    this.tasksSubject.next(this.tasks);
  }
  private saveTasks(): void {
    localStorage.setItem(this.a, JSON.stringify(this.tasks));
  }
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }
  getTaskById(id: number): Task | undefined {
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id === id) {
        return task;
      }
    }
    return undefined;
  }
  addTask(task: Omit<Task, 'id'>): void {
    let newId: number;
    if (this.tasks.length === 0) {
      newId = 1;
    } else {
      let maxId = 0;
      for (const existingTask of this.tasks) {
        if (existingTask.id > maxId) {
          maxId = existingTask.id;
        }
      }
      newId = maxId + 1;
    }
    const newTask: Task = {
      title: task.title,
      description: task.description,
      duedate: task.duedate,
      status: task.status,
      id: newId
    };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }
  updateTask(updatedTask: Task): void {
    const updatedTasks: Task[] = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const currentTask = this.tasks[i];
      if (currentTask.id === updatedTask.id) {
        updatedTasks.push(updatedTask);
      } else {
        updatedTasks.push(currentTask);
      }
    }
    this.tasks = updatedTasks;
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }
  deleteTask(id: number): void {
    const remainingTasks: Task[] = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id !== id) {
        remainingTasks.push(task);
      }
    }
    this.tasks = remainingTasks;
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }
  private getDefaultTasks(): Task[] {
    return [
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
  }
}