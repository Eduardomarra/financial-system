import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaEntradaComponent } from './lista-entradas/lista-entradas.component';
import { FormularioEntradaComponent } from './formulario-entrada/formulario-entrada.component';

const routes: Routes = [
    {path: '', component: ListaEntradaComponent},
    {path: ':new', component: FormularioEntradaComponent},
    {path: ':id/edit', component: FormularioEntradaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradasRoutingModule { }
