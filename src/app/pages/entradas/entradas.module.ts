import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { EntradasRoutingModule } from './entradas-routing.module';
import { CalendarModule} from 'primeng/calendar'
import { IMaskModule} from 'angular-imask'

import { ListaEntradaComponent } from './lista-entradas/lista-entradas.component';
import { FormularioEntradaComponent } from './formulario-entrada/formulario-entrada.component';


@NgModule({
  declarations: [
    ListaEntradaComponent,
    FormularioEntradaComponent
  ],
  imports: [
    SharedModule,
    EntradasRoutingModule,
    CalendarModule,
    IMaskModule
  ]
})
export class EntradasModule { }
