import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ExperienciaService } from './experiencia.service';
import { Experiencia } from './experiencia.model';
import { NuevaExperiencia } from './nueva-experiencia.model';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})
export class ExperienciasComponent {
  constructor(private apiService: ApiService, private experienciaService: ExperienciaService) {}
  
  experiencias: Experiencia[];

  ngOnInit(): void {
    this.experienciaService.getExperiencias().subscribe({
      next: (experiencias) => this.experiencias = experiencias,
      error: error => (console.log("Error"))
    })
  }

  reGetExperiencias() {
    this.experienciaService.getExperiencias().subscribe({
      next: (experiencias) => this.experiencias = experiencias,
      error: error => (console.log("Error"))
    })
  }

  agregarExperiencia(tipo: string, nombre: string, inicio: Date, fin: Date) {

    let experiencia = new NuevaExperiencia(tipo, nombre, inicio, fin)

    this.experienciaService.postExperiencia(experiencia).subscribe({
      next: (next) => this.reGetExperiencias(),
      error: error => (console.log("Error"))
    })

    this.modoAgregarExperiencia = !this.modoAgregarExperiencia
  }
  
  @Input() i: number;

  editarExperiencia(experiencia: Experiencia, nombre: string, tipo: string, inicio: Date, final: Date) {

    let id = experiencia.id;

    experiencia.tipo = tipo;
    experiencia.nombre = nombre;
    experiencia.inicioPeriodo = inicio;
    experiencia.finPeriodo = final;

    this.experienciaService.putExperiencia(experiencia, id).subscribe({
      next: (next) => this.reGetExperiencias(),
      error: error => (console.log("Error"))
    })

    this.cancelarEdicion();
  }

  eliminarExperiencia(experiencia: Experiencia) {
    let id = experiencia.id

    this.experienciaService.deleteExperiencia(id).subscribe({
      next: (next) => this.reGetExperiencias(),
      error: error => (console.log("Error"))
    })
  }

  logIn() {
    return this.apiService.getToken();
  }

  tipoExperiencia: string;
  nombreExperiencia: string;
  periodoInicioExperiencia: Date;
  periodoFinExperiencia: Date;

  periodoInicioExperienciaNew: Date;
  periodoFinExperienciaNew: Date;
  
  modoAgregarExperiencia: boolean = false;
  modoEditarExperiencia: boolean = false;

  modoEdicion: number = NaN;

  cancelarEdicion() {
    this.modoEditarExperiencia = false;
    this.modoEdicion = NaN;
  }

  cambiarCampos(exp: Experiencia) {
    this.tipoExperiencia = exp.tipo;
    this.nombreExperiencia = exp.tipo;
    this.periodoInicioExperiencia = exp.inicioPeriodo;
    this.periodoFinExperiencia = exp.finPeriodo;
  }

  formatearCampos() {
    this.tipoExperiencia = "";
    this.nombreExperiencia = "";
  }
}
