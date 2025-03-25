import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListaCategoriaComponent } from './lista-categorias/lista-categorias.component';
import { FormularioCategoriaComponent } from './formulario-categoria/formulario-categoria.component';

@NgModule({
  imports: [
    SharedModule,
    CategoriasRoutingModule,
  ],
  declarations: [
    ListaCategoriaComponent, 
    FormularioCategoriaComponent
  ]
})
export class CategoriasModule { }
