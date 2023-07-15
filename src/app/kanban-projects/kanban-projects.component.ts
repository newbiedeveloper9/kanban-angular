import { Component, OnInit } from '@angular/core';
import { KanbanService } from '../kanban.service';
import { KanbanBoard } from '../interfaces/Models';

@Component({
  selector: 'app-kanban-projects',
  templateUrl: './kanban-projects.component.html',
  styleUrls: ['./kanban-projects.component.css'],
})
export class KanbanProjectsComponent implements OnInit {
  constructor(private kanbanService: KanbanService) {}
  boards!: KanbanBoard[];

  ngOnInit(): void {
    this.kanbanService.getBoards().subscribe((data) => {
      this.boards = data;
    });
  }
}
