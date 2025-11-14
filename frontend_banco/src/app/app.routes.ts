import { Routes } from '@angular/router';
import { ListadoComponent } from './listado/listado.component';
import { AgregarComponent } from './agregar/agregar.component';

export const routes: Routes = [
  { path: '', component: ListadoComponent },   
  { path: 'agregar', component: AgregarComponent },
  {path: 'editar/:id',loadComponent: () => import('./editar/editar.component').then(m => m.EditarComponent) }
];


