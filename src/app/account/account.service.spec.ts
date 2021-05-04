import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [AccountService],
    });

    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should send request to /user/change-password', () => {
    const params = new HttpParams()
    .set('old_password', "oldpassword")
    .set('new_password', "newpassword");

    const expected = {id: 1}
    service.savePassword(params).subscribe(resp => {
      expect(resp).toEqual(expected);
    });

    const req = httpMock.expectOne(`${environment.apiURL}/user/change-password`);
    expect(req.request.method).toBe('POST');
    req.flush(expected);
  });

});
