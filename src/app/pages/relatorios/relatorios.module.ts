import { NgModule } from '@angular/core';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RelatoriosComponent
  ],
  imports: [
    RelatoriosRoutingModule,
    SharedModule
  ]
})
export class RelatoriosModule { }
