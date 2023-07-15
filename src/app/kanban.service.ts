import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board, Task } from './interfaces/Models';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  private apiUrl = 'https://localhost:44314';
  private headers = new HttpHeaders({
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjEyMGYxMjhlLWFiNGItNDBlMi1iZmJhLTg5YzgxN2E5ODMwYiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwidWlkIjoiM2Y5YmY5ZWItN2EyNS00NWVlLTkxMmItYjFlMzA0MmFjMDMwIiwiaXAiOiIxNzIuMTcuMC4yIiwicm9sZXMiOlsiQWRtaW4iLCJNb2RlcmF0b3IiLCJCYXNpYyJdLCJleHAiOjE2OTE5NTA4NzksImlzcyI6IklkZW50aXR5IiwiYXVkIjoiSWRlbnRpdHlVc2VyIn0.86G7JDjRXiJo9sktDLea4du6jC5mjHd66CNnl5CfpZk',
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getBoard(id: string): Observable<Board> {
    return this.http.get<Board>(this.apiUrl + '/api/board/' + id, {
      headers: this.headers,
    });
  }

  createTask(task: Task): Observable<any> {
    return this.http
      .post(this.apiUrl + '/api/task/', task, {
        headers: this.headers,
      })
      .pipe((x) => {
        console.log(x);
        return x;
      });
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put(this.apiUrl + '/api/task/' + task.id, task, {
      headers: this.headers,
    });
  }

  deleteTask(task: Task): Observable<any> {
    return this.http.delete(this.apiUrl + '/api/task/' + task.id, {
      headers: this.headers,
    });
  }

  switchColumn(task: Task, targetColumnId: string): Observable<any> {
    return this.http.post(
      this.apiUrl + '/api/task/' + task.id + '/switch-column',
      { columnTargetId: targetColumnId },
      {
        headers: this.headers,
      }
    );
  }

  reorderTasks(columnId: string, tasks: Task[]): Observable<any> {
    return this.http.post(
      this.apiUrl + '/api/column/' + columnId + '/reorder',
      tasks.map((task) => task.id),
      {
        headers: this.headers,
      }
    );
  }
}
