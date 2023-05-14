import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Educacion } from './educacion.model';
import { Observable } from 'rxjs';
import { NuevaEducacion } from './nueva-educacion.model';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  constructor(private http: HttpClient) { }

  getEducacion():Observable<Educacion[]> {
      return this.http.get<Educacion[]>('http://localhost:8080/educacion/traer')
  }

  postEducacion(educacion: NuevaEducacion):Observable<NuevaEducacion> {
      return this.http.post<NuevaEducacion>('http://localhost:8080/educacion/agregar', educacion)
  }

  deleteEducacion(id: number):Observable<Educacion> {
      return this.http.delete<Educacion>(`http://localhost:8080/educacion/eliminar/${id}`)
  }

  putEducacion(educacion: Educacion, id: number):Observable<Educacion> {
      return this.http.put<Educacion>(`http://localhost:8080/educacion/editar/${id}`, educacion)
  }
}
