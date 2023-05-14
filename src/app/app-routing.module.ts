import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalComponent } from './main/header/modal/modal.component';
import { MainComponent } from './main/main.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { authGuard } from './helpers/auth.guard';
import { ErrorComponent } from './error/error.component';
import { HabilidadesComponent } from './main/habilidades/habilidades.component';

// const routes: Routes = [
//   {path: 'inicio', component: MainComponent},
//   {path: 'header', component: HeaderComponent, children: [
//   {path: 'cambiar-foto', component: HeaderModalComponent}
//   ]}
// ];

// const routes: Routes = [
//   { path: '', component: MainComponent},
//   {path: 'header', component: HeaderComponent, children: [
//       { path: 'cambiar-foto', component: HeaderModalComponent }
//     ]
//   }
// ];

const routes: Routes = [
  {path:'', component: MainComponent
  // , canActivate: [authGuard]
  , children:[
      {path: 'cambiar-foto', component: ModalComponent}
  ]},
  {path:'login', component: IniciarSesionComponent},
  {path:'modal', component: ModalComponent},
  {path:'skill', component: HabilidadesComponent},
  {path: '**', component: ErrorComponent
  // , canActivate: [authGuard]
  },
  // {path:'header', component: HeaderComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
