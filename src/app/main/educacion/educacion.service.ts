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
      return this.http.get<Educacion[]>('https://portfoliobackend-cfdi.onrender.com/educacion/traer')
  }

  postEducacion(educacion: NuevaEducacion):Observable<NuevaEducacion> {
      return this.http.post<NuevaEducacion>('https://portfoliobackend-cfdi.onrender.com/educacion/agregar', educacion)
  }

  deleteEducacion(id: number):Observable<Educacion> {
      return this.http.delete<Educacion>(`https://portfoliobackend-cfdi.onrender.com/educacion/eliminar/${id}`)
  }

  putEducacion(educacion: Educacion, id: number):Observable<Educacion> {
      return this.http.put<Educacion>(`https://portfoliobackend-cfdi.onrender.com/educacion/editar/${id}`, educacion)
  }
}
