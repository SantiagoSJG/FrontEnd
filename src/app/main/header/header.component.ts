import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, Sanitizer } from '@angular/core';
import { NavigationExtras, Router, Routes } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModalService } from './modal/modal.service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private http: HttpClient,
    private routes: Router,
    private modalService: ModalService,
    private apiService: ApiService,
    private sanitizer: DomSanitizer) {}

    fotoPerfil: string;
    fotoBanner: string;

    ngOnInit() {
      this.http.get('https://portfoliobackend-cfdi.onrender.com/media/foto-perfil', { responseType: 'blob' })
      .subscribe(response => {
        const blob = new Blob([response], { type: 'image/*' });
        this.fotoPerfil = URL.createObjectURL(blob);
      });
      
      this.http.get('https://portfoliobackend-cfdi.onrender.com/media/foto-banner', { responseType: 'blob' })
      .subscribe(response => {
        const blob = new Blob([response], { type: 'image/*' });
        this.fotoBanner = URL.createObjectURL(blob);
      });


      // this.mediaService.getImageInfo().subscribe((response: any) => {
      // console.log(response);
      // this.fotoPerfil = response.url;
      // })
    }

  modalAbierto: boolean = false;

  modal(id: string) {
    this.modalService.abrirModal(id);
  }

  iniciarSesion() {
    this.routes.navigate(['login']);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
  }
  
  logIn() {
    return !!this.apiService.getToken();
  }
}
