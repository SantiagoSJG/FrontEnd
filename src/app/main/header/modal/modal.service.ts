import { Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService implements OnInit {
  constructor(private routes: Router) { }
  private id$ = new BehaviorSubject<string>('');

  ngOnInit(): void {
  }


  abrirModal(id: string) {
    console.log(id)
    this.id$.next(id);
    this.routes.navigate(['/cambiar-foto'])
  }

  cerrarModal() {
    if (this.id$.getValue() != 'foto-perfil' && this.id$.getValue() != 'foto-banner') {
    this.routes.navigate(['']);
  }
  }

  getId() {
    return this.id$.asObservable();
  }
}
