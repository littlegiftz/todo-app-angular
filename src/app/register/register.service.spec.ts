import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { RegisterService } from './register.service';
import { environment } from 'src/environments/environment';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [RegisterService],
    });

    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should send request to /register', () => {
    const params = new HttpParams()
    .set('email', "test@email.com")
    .set('password', "password");

    const expected = {id: 1}
    service.register(params).subscribe(resp => {
      expect(resp).toEqual(expected);
    });

    const req = httpMock.expectOne(`${environment.apiURL}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(expected);
  });

});
