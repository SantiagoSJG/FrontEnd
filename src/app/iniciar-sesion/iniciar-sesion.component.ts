import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Credentials } from './credentials.model';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {
form: NgForm;

constructor(
  // private formBuilder: FormBuilder, 
  private router: Router,
  private apiService: ApiService) {
    // this.form = this.formBuilder.group({
      // email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(8)]]
    // })
  }

  // get Email() {
  //   return this.form.get("email");
  // }

  // get Password() {
  //   return this.form.get("password");
  // }

  creds: Credentials = {
    'email': "",
    'password': ""
  }

  login(form: NgForm) {
    this.apiService.login(this.creds)
    .subscribe(response => {
      this.router.navigate([""])
    })
  }
}

