import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<TaskDialogComponent>,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  form!: FormGroup

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      task: new FormControl('', [Validators.required]),
      duedate: new FormControl('', [Validators.required]),
    })
  }

  get f() { return this.form.controls; }

  save() {
    this.dialog.close(this.form.value);
  }

  cancel() {
    this.dialog.close();
  }

}
