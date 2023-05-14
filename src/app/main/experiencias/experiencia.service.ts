import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experiencia } from './experiencia.model';
import { Observable } from 'rxjs';
import { NuevaExperiencia } from './nueva-experiencia.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  constructor(private http: HttpClient) { }

  getExperiencias():Observable<Experiencia[]> {
      return this.http.get<Experiencia[]>('http://localhost:8080/experiencias/traer')
  }

  postExperiencia(experiencia: NuevaExperiencia):Observable<NuevaExperiencia> {
      return this.http.post<NuevaExperiencia>('http://localhost:8080/experiencias/agregar', experiencia)
  }

  deleteExperiencia(id: number):Observable<Experiencia> {
      return this.http.delete<Experiencia>(`http://localhost:8080/experiencias/eliminar/${id}`)
  }

  putExperiencia(experiencia: Experiencia, id: number):Observable<Experiencia> {
      return this.http.put<Experiencia>(`http://localhost:8080/experiencias/editar/${id}`, experiencia)
  }
}
