import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Credentials } from './iniciar-sesion/credentials.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor (private http: HttpClient) {}

  // getContactos(): Observable<Contacto[]> {
  //   return this.http.get<Contacto[]>('http://localhost:8080/api/contactos')
  // }

  
  login(creds: Credentials) {
    console.log("Haciendo login")

    console.log(creds)
    return this.http.post('https://portfoliobackend-cfdi.onrender.com/login', creds, {
    observe: 'response'
  }).pipe(
  //   catchError(error => {
  //   console.log('Ocurrió un error durante la llamada HTTP: ', error);
  //   return of(error); // devolver un observable que emita el error capturado
  // }),
    map((response: HttpResponse<any>) => {
    
    const body = response.body;
    const headers = response.headers;

    const bearerToken = headers.get('Authorization');
    
    console.log(headers)

    console.log(bearerToken)

    const token = bearerToken ? bearerToken.replace('Bearer ', '') : '';

    localStorage.setItem('token', token);

    return body;
  }))
  }

  getToken() {
    return localStorage.getItem('token');
  }
}