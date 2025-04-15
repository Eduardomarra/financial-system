import { Component, OnInit } from '@angular/core';

import { Entrada } from '../shared/entrada.model'
import { EntradaService } from '../shared/entrada.service'
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-lista-entradas',
  templateUrl: './lista-entradas.component.html',
  styleUrls: ['./lista-entradas.component.css']
})
export class ListaEntradaComponent extends BaseResourceListComponent<Entrada> {

  constructor(
    private entradaService: EntradaService
  ) { 
    super(entradaService);
  }
}
