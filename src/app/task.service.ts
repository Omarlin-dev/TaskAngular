import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { taskModel } from './Modelo/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  urlApp: string = "https://localhost:44336/"; 
  urlApi: string  = "api/Task/";

  GetTasks(): Observable<taskModel[]>{
    return this.http.get<taskModel[]>(this.urlApp + this.urlApi);
  }

  AddTask(task: taskModel): Observable<taskModel>{
    return this.http.post<taskModel>(this.urlApp + this.urlApi, task);
  }

  UpdateTask(id: number, task: taskModel): Observable<any>{ 
    return this.http.put<any>(this.urlApp + this.urlApi + id, task);
  }

  deleteTask(id: number): Observable<any>{
    return this.http.delete<any>(this.urlApp + this.urlApi + id);
  }

}
