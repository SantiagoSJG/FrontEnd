import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkillService } from './main/habilidades/habilidad.service';
import { HeaderComponent } from './main/header/header.component';
import { MainComponent } from './main/main.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HabilidadesComponent } from './main/habilidades/habilidades.component';
import { ModalComponent } from './main/header/modal/modal.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { ErrorComponent } from './error/error.component';
import { EducacionComponent } from './main/educacion/educacion.component';
import { ProyectosComponent } from './main/proyectos/proyectos.component';
import { ExperienciasComponent } from './main/experiencias/experiencias.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalComponent,
    MainComponent,
    IniciarSesionComponent,
    HabilidadesComponent,
    ErrorComponent,
    EducacionComponent,
    ProyectosComponent,
    ExperienciasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    SkillService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
