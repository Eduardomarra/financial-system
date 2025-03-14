import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaCategoriaComponent } from './lista-categorias/lista-categorias.component';
import { FormularioCategoriaComponent } from './formulario-categoria/formulario-categoria.component';

const routes: Routes = [
  {path: '', component: ListaCategoriaComponent},
  {path: ':new', component: FormularioCategoriaComponent},
  {path: ':id/edit', component: FormularioCategoriaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
