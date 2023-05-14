import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from './proyecto.model';
import { Observable } from 'rxjs';
import { NuevoProyecto } from './nuevo-proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  constructor(private http: HttpClient) { }

  getProyectos():Observable<Proyecto[]> {
      return this.http.get<Proyecto[]>('http://localhost:8080/proyectos/traer')
  }

  postProyecto(proyecto: NuevoProyecto):Observable<NuevoProyecto> {
      return this.http.post<NuevoProyecto>('http://localhost:8080/proyectos/agregar', proyecto)
  }

  deleteProyecto(id: number):Observable<Proyecto> {
      return this.http.delete<Proyecto>(`http://localhost:8080/proyectos/eliminar/${id}`)
  }

  putProyecto(proyecto: Proyecto, id: number):Observable<Proyecto> {
      return this.http.put<Proyecto>(`http://localhost:8080/proyectos/editar/${id}`, proyecto)
  }
}
