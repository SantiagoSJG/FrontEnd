import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  constructor(private loca: LocationStrategy, private routes: Router) {}

  atras() {
    this.loca.back()
  }

  inicio() {
    this.routes.navigate([''])
  }
}
