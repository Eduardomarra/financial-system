import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntradasRoutingModule } from './entradas-routing.module';
import { ListaEntradaComponent } from './lista-entradas/lista-entradas.component';
import { FormularioEntradaComponent } from './formulario-entrada/formulario-entrada.component';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarModule} from 'primeng/calendar'
import { IMaskModule} from 'angular-imask'

@NgModule({
  declarations: [
    ListaEntradaComponent,
    FormularioEntradaComponent
  ],
  imports: [
    CommonModule,
    EntradasRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule
  ]
})
export class EntradasModule { }
