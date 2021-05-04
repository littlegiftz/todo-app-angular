import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [LoginService],
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should send request to /login', () => {
    const params = new HttpParams()
    .set('email', "test@email.com")
    .set('password', "password");

    const expected = {token: "token"}
    service.login(params).subscribe(resp => {
      expect(resp).toEqual(expected);
    });

    const req = httpMock.expectOne(`${environment.apiURL}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(expected);
  });

});
