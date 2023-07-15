import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { KanbanService } from '../kanban.service';
import { Board, Column, Task } from '../interfaces/Models';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
})
export class KanbanBoardComponent implements OnInit {
  kanban!: Board;
  task: Task = {
    userAttached: 'John Doe',
    title: '',
    description: '',
    order: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private kanbanService: KanbanService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id') ?? '';
      this.kanbanService.getBoard(id).subscribe((data) => {
        data.columns.forEach((column) => {
          column.tasks.sort((a, b) => a.order - b.order);
        });
        this.kanban = data;
      });
    });
  }

  drop(event: CdkDragDrop<Task[], any>, targetColumn: Column): void {
    if (
      event.previousIndex === event.currentIndex &&
      event.previousContainer === event.container
    ) {
      return;
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      let task = event.container.data[event.currentIndex];
      this.kanbanService
        .switchColumn(task, targetColumn.id)
        .subscribe(() =>
          this.kanbanService
            .reorderTasks(targetColumn.id, event.container.data)
            .subscribe()
        );

      return;
    }

    this.kanbanService
      .reorderTasks(targetColumn.id, event.container.data)
      .subscribe();
  }

  openDialog(column: Column): void {
    this.task.userAttached = this.authService.currentUserValue.userName;
    this.task.columnId = column.id;
    this.task.status = column.name;
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '75%',
      height: '75%',
      data: { task: this.task, addTask: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.save === true) {
        this.kanbanService.createTask(this.task).subscribe((data) => {
          this.kanbanService.getBoard(this.kanban.id).subscribe((data) => {
            data.columns.forEach((column) => {
              column.tasks.sort((a, b) => a.order - b.order);
            });
            this.kanban = data;
          });
        });
      }
    });
  }

  onDeleteTask(task: Task): void {
    this.kanban.columns.filter((col) => col.id === task.columnId)[0].tasks =
      this.kanban.columns
        .filter((col) => col.id === task.columnId)[0]
        .tasks.filter((t) => t.id !== task.id);

    this.kanban.totalNumberOfTasks--;
  }

  logout(): void {
    this.authService.logout();
  }
}
