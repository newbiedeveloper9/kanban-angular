import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../interfaces/Models';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
})
export class TaskDialogComponent {
  form: FormGroup;
  task: Task;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.task = data.task;

    this.form = fb.group({
      title: [this.task.title],
      description: [this.task.description],
    });
  }

  save(): void {
    this.task.title = this.form?.value?.title ?? '';
    this.task.description = this.form?.value?.description ?? '';

    this.dialogRef.close({ save: true });
  }

  deleteTask(event: any): void {
    event.preventDefault();
    this.dialogRef.close({ delete: true });
  }
}
