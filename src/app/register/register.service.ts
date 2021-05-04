import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient
  ) { }

  register(data: any) {
    return this.http.post(`${environment.apiURL}/register`, data)
  }

}
