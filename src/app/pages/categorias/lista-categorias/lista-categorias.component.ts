import { Component, OnInit } from '@angular/core';

import { Categoria} from '../shared/categoria.model'
import { CategoriaService } from '../shared/categoria.service'
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriaComponent extends BaseResourceListComponent<Categoria> {

  constructor(
    protected categoriaService: CategoriaService
  ) {
    super(categoriaService);
  }

}
