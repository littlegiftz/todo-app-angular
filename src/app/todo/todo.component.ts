import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../_services/auth.service';
import { TodoService } from './todo.service';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class TodoComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private todoService: TodoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private datepipe: DatePipe
  ) { }

  taskList!: any[]

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.todoService.getList().subscribe(
      (resp:any) => {
        console.log(resp)
        this.taskList = resp
      },
      error => {
        console.log(error)
      }
    )
  }

  toggleCompleted(task: any){
    task.completed = (task.completed) ? false : true

    const params = new HttpParams()
    .set('completed', task.completed)

    this.todoService.saveTask(task.id, params).subscribe(
      (resp:any) => {
        console.log(resp)
      },
      error => {
        console.log(error)
      }
    )
  }

  newTask() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '382px',
      panelClass: 'task-dialog'
    })

    dialogRef.afterClosed().subscribe(result => {
      let formattedDate = this.datepipe.transform(result.duedate, 'yyyy-MM-dd') || "";

      const params = new HttpParams()
      .set('task', result.task)
      .set('duedate', formattedDate)

      this.todoService.newTask(params).subscribe(
        (resp:any) => {
          console.log(resp)
          this.taskList.unshift(resp)
        },
        error => {
          console.log(error)
        }
      )

      console.log(this.taskList)
    })
  }

  logout() {
    this.authService.logout()
  }

}
