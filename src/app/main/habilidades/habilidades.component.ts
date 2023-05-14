import { Component, Input } from '@angular/core';
import { SkillService } from './habilidad.service';
import { Skill } from './habilidad.model';
import { ApiService } from 'src/app/api.service';
import { NgForm } from '@angular/forms';
import { NuevaHabilidad } from './nueva-habilidad.model';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent {
  constructor(private skillService: SkillService, private apiService: ApiService) {};

  habilidades: Skill[] = [];

  modoEdicionSkill: number = NaN;
  editarSkill: boolean = false;

  agregarSkill: boolean = false;

  @Input() i: number;
  // @Input() habilidad: Skill;


  ngOnInit(): void {
    this.skillService.getHabilidades().subscribe(
      habilidades => this.habilidades = habilidades,
      error => console.error(error)
    );
  }
  
  nuevaHabilidad: string = "";
  nuevaHabilidadNivel: number = 0;

  reGetHabilidades() {
    this.skillService.getHabilidades().subscribe(
      habilidades => this.habilidades = habilidades,
      error => console.error(error)
    );
  }

  agregarHabilidad(nombre: string, nivel: number) {

    let habilidad = new NuevaHabilidad(nombre, nivel);

    this.skillService.postHabilidad(habilidad).subscribe({
      next: () => {
        console.log("Se ha añadido la habilidad " + habilidad.nombre);
        this.reGetHabilidades();
      },
      error: (error) => console.log("Error: No se ha podido añadir la habilidad", error)
    })

    this.agregarSkill = false;
  }

  eliminarHabilidad(habilidad: Skill) {
    const id = habilidad.id;

    this.skillService.deleteHabilidad(id).subscribe({
      next: () => {
        console.log("Se ha eliminado la habilidad");
        this.reGetHabilidades();
      },
      error: (error) => console.log("Error: No se ha podido eliminar la habilidad", error)
    })

    this.modoEdicionSkill = -1

    this.reGetHabilidades();
  }

  editarHabilidad(habilidad: Skill, nuevoNivel: number) {
    const id = habilidad.id;

    habilidad.nivel = nuevoNivel
    
    this.skillService.putHabilidad(habilidad, id).subscribe({
      next: () => console.log("Se ha editado la habilidad " + habilidad.nombre),
      error: (error) => console.log("Error: No se ha podido editar la habilidad", error)
    })

    this.modoEdicionSkill = -1
  }

  nivel: number = 6;

  cancelarEdicion() {
    this.modoEdicionSkill = -1
    this.editarSkill = false;
  }

  logIn() {
    return this.apiService.getToken()
  }

  estrellas = [
    // 0
    `<i class="bi bi-star"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>`,
    // 1
    `<i class="bi bi-star-half"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>`,
    // 2
    `<i class="bi bi-star-fill"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>`,
    // 3
    `<i class="bi bi-star-fill"></i>
    <i class="bi bi-star-half"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>`,
    // 4
    `<i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>`,
    // 5
    `<i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-half"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>`,
    // 6 
    `<i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>`,
    // 7
    `<i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-half"></i>
    <i class="bi bi-star"></i>`,
    // 8
    `<i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star"></i>`,
    // 9
    `<i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-half"></i>`,
    // 10
    `<i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>`,
  ]
}