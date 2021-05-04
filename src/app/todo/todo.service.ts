import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient
  ) { }

  getList() {
    return this.http.get(`${environment.apiURL}/todo/`)
  }
  newTask(data: any) {
    return this.http.post(`${environment.apiURL}/todo/`, data)
  }
  saveTask(id: number, data: any) {
    return this.http.post(`${environment.apiURL}/todo/${id}`, data)
  }
  deleteTask(id: number) {
    return this.http.delete(`${environment.apiURL}/todo/${id}`)
  }

}
