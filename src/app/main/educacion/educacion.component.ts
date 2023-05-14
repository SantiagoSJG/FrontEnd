import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { EducacionService } from './educacion.service';
import { Educacion } from './educacion.model';
import { NgForm } from '@angular/forms';
import { NuevaEducacion } from './nueva-educacion.model';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  constructor (private apiService: ApiService, private educacionService: EducacionService) {}

  educacion: Educacion[];

  ngOnInit(): void {
    this.educacionService.getEducacion().subscribe({
      next: (educacion) => this.educacion = educacion,
      error: error => (console.log("Error"))
    })
  }

  reGetEducacion() {
    this.educacionService.getEducacion().subscribe({
      next: (educacion) => {
        this.educacion = educacion;
      },
      error: error => (console.log("Error"))
    });
  }

  agregarEducacion(tipo: string, nombre: string, inicio: Date, fin: Date) {

    let educacion = new NuevaEducacion(tipo, nombre, inicio, fin)

    this.educacionService.postEducacion(educacion).subscribe({
      next: (next) => {
        console.log("Educacion añadida.")
        this.reGetEducacion();
      },
      error: error => (console.log("Error"))
    })

    this.modoAgregarEducacion = !this.modoAgregarEducacion;
  }

  @Input() i: number; 

  eliminarEducacion(educacion: Educacion) {
    let id = educacion.id

    this.educacionService.deleteEducacion(id).subscribe({
      next: (next) => this.reGetEducacion(),
      error: error => (console.log("Error"))
    })
  }

  editarEducacion(educacion: Educacion, nombre: string, tipo: string, inicio: Date, final: Date) {

    let id = educacion.id;

    educacion.tipo = tipo;
    educacion.nombre = nombre;
    educacion.inicioPeriodo = inicio;
    educacion.finPeriodo = final;

    this.educacionService.putEducacion(educacion, id).subscribe({
      next: (next) => this.reGetEducacion(),
      error: error => (console.log("Error"))
    })

    this.cancelarEdicion();
  }

  logIn() {
    return this.apiService.getToken();
  }

  tipoInstitucion: string;
  nombreInstitucion: string;
  periodoInicioInstitucion: Date;
  periodoFinInstitucion: Date;
  periodoInicioInstitucionNew: Date;
  periodoFinInstitucionNew: Date;
  
  modoAgregarEducacion: boolean = false;
  modoEditarEducacion: boolean = false;

  modoEdicion: number = NaN;

  cancelarEdicion() {
    this.modoEditarEducacion = false;
    this.modoEdicion = NaN;
  }

  cambiarCampos(edu: Educacion) {
    this.tipoInstitucion = edu.tipo;
    this.nombreInstitucion = edu.nombre;
    this.periodoInicioInstitucion = edu.inicioPeriodo;
    this.periodoFinInstitucion = edu.finPeriodo;
  }

  formatearCampos() {
    this.tipoInstitucion = "";
    this.nombreInstitucion = "";
  }
}
