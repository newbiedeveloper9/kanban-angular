import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'kanban/11111111-1111-1111-1111-111111111111',
    pathMatch: 'full',
  },
  {
    path: 'kanban/:id',
    component: KanbanBoardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
