import { Component, Input } from '@angular/core';
import { Task } from '../interfaces/Models';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { KanbanService } from '../kanban.service';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.css'],
})
export class KanbanCardComponent {
  @Input() task!: Task;
  @Output() deleteTask: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(
    private dialog: MatDialog,
    private kanbanService: KanbanService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '75%',
      height: '75%',
      data: { task: this.task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined || result === null) return;

      if (result.save === true)
        this.kanbanService.updateTask(this.task).subscribe();

      if (result.delete === true)
        this.kanbanService.deleteTask(this.task).subscribe((x) => {
          this.deleteTask.emit(this.task);
        });
    });
  }
}
