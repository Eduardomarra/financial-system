import { NgModule } from '@angular/core';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [
    RelatoriosComponent
  ],
  imports: [
    RelatoriosRoutingModule,
    SharedModule,
    ChartModule
  ]
})
export class RelatoriosModule { }
