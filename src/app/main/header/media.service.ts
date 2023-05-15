import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }

  subirImagen(formulario: FormData): Observable<any> {

    return this.http.post('https://portfoliobackend-cfdi.onrender.com/media/upload', formulario);
  }

  // private imageUrlEndpoint = 'https://portfoliobackend-cfdi.onrender.com/media/IMG_20230423_152814178.jpg';

  // getImageInfo(): Observable<any> {
  //     return this.http.get<any>(this.imageUrlEndpoint);
  // }
}
