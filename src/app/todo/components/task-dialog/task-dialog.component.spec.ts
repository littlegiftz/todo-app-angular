import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';

import { TaskDialogComponent } from './task-dialog.component';

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDialogComponent ],
      imports: [ 
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable button if task empty', () => {
    const duedate = component.form.controls.duedate;
    duedate.setValue("2021-05-05");

    fixture.detectChanges();
    let button = fixture.nativeElement.querySelector('#btnSave');
    expect(button.disabled).toBe(true);
  });

  it('should disable button if duedate empty', () => {
    const task = component.form.controls.task;
    task.setValue("title");

    fixture.detectChanges();
    let button = fixture.nativeElement.querySelector('#btnSave');
    expect(button.disabled).toBe(true);
  });

  it('should enable button if task and duedate filled', () => {
    const task = component.form.controls.task;
    const duedate = component.form.controls.duedate;
    task.setValue("title");
    duedate.setValue("2021-05-05");

    fixture.detectChanges();
    let button = fixture.nativeElement.querySelector('#btnSave');
    console.log(button)
    expect(button.disabled).toBe(false);
  });

});
