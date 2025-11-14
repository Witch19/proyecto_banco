import { Routes } from '@angular/router';
import { ListadoComponent } from './features/productos/listado/listado.component';
import { AgregarComponent } from './features/productos/agregar/agregar.component';

export const routes: Routes = [
  { path: '', component: ListadoComponent },   
  { path: 'agregar', component: AgregarComponent },
  {path: 'editar/:id',loadComponent: () => import('./features/productos/editar/editar.component').then(m => m.EditarComponent) }
];


