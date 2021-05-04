import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { TodoService } from './todo.service';
import { environment } from 'src/environments/environment';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [TodoService],
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send request to /todo for get tasks', () => {
    const expected = [{ 
      completed: false,
      duedate: "2021-05-05",
      id: 1,
      task: "title",
      user_id: 1
    },{ 
      completed: false,
      duedate: "2021-05-05",
      id: 1,
      task: "title",
      user_id: 1
    }]

    service.getList().subscribe(resp => {
      expect(resp).toEqual(expected);
    });

    const req = httpMock.expectOne(`${environment.apiURL}/todo/`);
    expect(req.request.method).toBe('GET');
    req.flush(expected);
  });
  
  it('should send request to /todo for new task', () => {
    const params = new HttpParams()
    .set('task', "title")
    .set('duedate', "2021-05-05");

    const expected = { 
      completed: false,
      duedate: "2021-05-05",
      id: 1,
      task: "title",
      user_id: 1
    }
    service.newTask(params).subscribe(resp => {
      expect(resp).toEqual(expected);
    });

    const req = httpMock.expectOne(`${environment.apiURL}/todo/`);
    expect(req.request.method).toBe('POST');
    req.flush(expected);
  });

  it('should send request to /todo/:id for edit task', () => {
    const params = new HttpParams()
    .set('completed', "true");

    const expected = { 
      completed: true,
      duedate: "2021-05-05",
      id: 1,
      task: "title",
      user_id: 1
    }
    service.saveTask(1, params).subscribe(resp => {
      expect(resp).toEqual(expected);
    });

    const req = httpMock.expectOne(`${environment.apiURL}/todo/1`);
    expect(req.request.method).toBe('POST');
    req.flush(expected);
  });

});
