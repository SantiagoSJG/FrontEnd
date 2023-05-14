import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ProyectoService } from './proyecto.service';
import { Proyecto } from './proyecto.model';
import { NuevoProyecto } from './nuevo-proyecto.model';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  constructor(private apiService: ApiService, private proyectoService: ProyectoService) {}

  proyectos: Proyecto[];

  ngOnInit(): void {
    this.proyectoService.getProyectos().subscribe({
      next: (proyectos) => this.proyectos = proyectos,
      error: error => (console.log("Error"))
    })
  }

  reGetProyectos() {
    this.proyectoService.getProyectos().subscribe({
      next: (proyectos) => this.proyectos = proyectos,
      error: error => (console.log("Error"))
    })
  }

  agregarProyecto(nombre: string, enlace: string, descripcion: string, lenguajes: string) {
    let proyecto = new NuevoProyecto(nombre, enlace, descripcion, lenguajes);

    this.proyectoService.postProyecto(proyecto).subscribe({
      next: (next) => this.reGetProyectos(),
      error: error => (console.log("Error"))
    })

    this.modoAgregarProyecto = !this.modoAgregarProyecto
  }

  editarProyecto(proyecto: Proyecto, nombre: string, enlace: string, descripcion: string, lenguajes: string) {
    console.log(proyecto)

    let id = proyecto.id;

    proyecto.nombre = nombre;
    proyecto.enlace = enlace;
    proyecto.descripcion = descripcion;
    proyecto.lenguajes = lenguajes;

    this.proyectoService.putProyecto(proyecto, id).subscribe({
      next: (next) => this.reGetProyectos(),
      error: error => (console.log("Error"))
    })

    this.cancelarEdicion();
  }

  eliminarProyecto(proyecto: Proyecto) {
    let id = proyecto.id;

    this.proyectoService.deleteProyecto(id).subscribe({
      next: (next) => this.reGetProyectos(),
      error: error => (console.log("Error"))
    })
  }

  logIn() {
    return this.apiService.getToken();
  }

  nombreProyecto: string;
  descripcionProyecto: string;
  lenguajesProyecto: string;
  enlaceProyecto: string;
  
  modoAgregarProyecto: boolean = false;
  modoEditarProyecto: boolean = false;

  modoEdicion: number = NaN

  cancelarEdicion() {
    this.modoEditarProyecto = false;
    this.modoEdicion = NaN;
  }
}
