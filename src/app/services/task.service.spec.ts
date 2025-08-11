import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import {  describe} from 'node:test';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
