import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { taskModel } from '../Modelo/task.model';
import { TaskService } from '../task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task: taskModel = new taskModel();
  listTask$!: Observable<taskModel[]>;
  acciones: string = "AGREGAR";

  constructor(private servicio: TaskService,
                private toasTr: ToastrService) { }

  ngOnInit(): void {
    this.listTask$ = this.servicio.GetTasks();
  }


  SaveTarea(task: taskModel){

    if(task.id == 0){
      this.servicio.AddTask(task).subscribe(res => {
        if(res.id != 0){
          this.toasTr.success("Targeta insertada con exito", "Targeta Insertada", {
            timeOut:3000
          });
        }else{
          this.toasTr.error("No se pudo insertar la targeta", "Error", {
            timeOut:3000
          });
        }
  
        this.clearTask();
        this.listTask$ = this.servicio.GetTasks();
      });
    }else{
      this.servicio.UpdateTask(task.id, task).subscribe(res => {
        if(res.mensaje != ""){
          this.toasTr.success("Targeta actualizada con exito", "Targeta Insertada", {
            timeOut:3000
          });
        }else{
          this.toasTr.error("No se pudo actualizar la targeta", "Error", {
            timeOut:3000
          });
        }
  
        this.clearTask();
        this.listTask$ = this.servicio.GetTasks();
      });
    }
  }

  onDelete(id: number){
    this.servicio.deleteTask(id).subscribe(res => {
      if(res.mensaje != ""){
        this.toasTr.error(res.mensaje, "Targeta Eliminada",
        {
          timeOut: 3000
        });
      }else{
        this.toasTr.error("No se pudo eliminar la targeta", "error",
        {
          timeOut: 3000
        });
      }

      this.listTask$ = this.servicio.GetTasks();
    });
  }

  onSet(select: taskModel){
    this.task.id = select.id;
    this.task.title = select.title;
    this.task.description = select.description;
    this.acciones = "EDITAR";
  }

  clearTask(){
    this.task.id = 0;
    this.task.title = "";
    this.task.description = "";
    this.acciones = "AGREGAR";
  }

}
