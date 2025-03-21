import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaEntradaComponent } from './lista-entradas/lista-entradas.component';

const routes: Routes = [
    {path: '', component: ListaEntradaComponent},
    // {path: ':new', component: FormularioCategoriaComponent},
    // {path: ':id/edit', component: FormularioCategoriaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradasRoutingModule { }
