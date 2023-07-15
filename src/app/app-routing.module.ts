import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { LoginPanelComponent } from './login-panel/login-panel.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'kanban',
    redirectTo: 'kanban/11111111-1111-1111-1111-111111111111',
    pathMatch: 'full',
  },
  {
    path: 'kanban/:id',
    component: KanbanBoardComponent,
  },
  {
    path: 'login',
    component: LoginPanelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
