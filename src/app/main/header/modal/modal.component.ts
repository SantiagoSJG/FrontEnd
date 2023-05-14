import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaService } from '../media.service';
import { ModalService } from './modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
    private mediaService: MediaService,
    private modalService: ModalService,
    private routes: Router
  ) {}

  valorId: string;
  id: string;

  ngOnInit(): void {
    this.modalService.getId().subscribe(id => {
      this.id = id;

      if (id === 'foto-perfil') {
        this.valorId = 'foto de perfil';
      } else if (id === 'foto-banner') {
        this.valorId = 'imagen de banner';
      }
    });
  }

  archivos: any = [];
  imagenE: string = '';

  recomendacionImagen: boolean = true;
  errorImagen: boolean = false;

  @ViewChild('archivoInput') inputFile: ElementRef;
  @ViewChild('nuevaImagen') imagen: ElementRef;

  capturarImagen(event: any) {
    const imagenCapturada = event.target.files[0];

    let extPermitidas = /\.(png|jpe?g)$/i;

    // console.log(this.imagen.nativeElement.src)

    if (!extPermitidas.exec(imagenCapturada.name)) {
      this.recomendacionImagen = false;
      this.errorImagen = true;
      this.imagen.nativeElement.src = '';
    } else {
      // this.extraerBase64(imagenCapturada).then((imagen:any) => {
      //   this.previsualizacion = imagen.base;
      //   console.log(imagen);
      // });

      this.archivos.push(imagenCapturada);

      // console.log(imagenCapturada)
      // console.log(this.imagen)
      if (imagenCapturada) {
        this.recomendacionImagen = false;
        this.errorImagen = false;

        let imagenPrev = this.imagen;
        // console.log(imagenNueva)

        const visor = new FileReader();

        visor.onload = (e) => {
          // console.log(e.target?.result)
          imagenPrev.nativeElement.src = e.target?.result;

          // console.log(imagenNueva.nativeElement.innerHTML)
        };

        visor.readAsDataURL(imagenCapturada);
      }
    }
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          reject({
            base: null,
          });
        };
      } catch (e) {
        base: null;
      }
    });

  subirImagen() {
    const formData = new FormData();
    formData.append('file', this.archivos[0]);

    console.log(this.id)
  
    formData.append('id', this.id);

    console.log(formData)

    this.mediaService.subirImagen(formData).subscribe((response) => {
      console.log(response);
      location.reload();
    });

    this.routes.navigate([''])
  }

  cerrarModal() {
    // this.modalService.cerrarModal();
  }
}