import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListaCategoriaComponent } from './lista-categorias/lista-categorias.component';
import { FormularioCategoriaComponent } from './formulario-categoria/formulario-categoria.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ListaCategoriaComponent, 
    FormularioCategoriaComponent
  ]
})
export class CategoriasModule { }
