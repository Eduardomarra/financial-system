import { Component, OnInit } from '@angular/core';

import { Categoria} from '../shared/categoria.model'
import { CategoriaService } from '../shared/categoria.service'

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriaComponent implements OnInit {

  categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.categoriaService.getAll().subscribe(
      categorias => this.categorias = categorias,
      error => console.error('Erro ao carregar categorias:', error)
    )
  }

  deletCategoria(categoria: Categoria) {
    const confirmDelete = confirm("Confirma exclusão da categoria?");

    if(confirmDelete) {
      this.categoriaService.delete(categoria.id).subscribe(
        () => {
          this.categorias = this.categorias.filter(c => c.id!== categoria.id);
        },
        error => console.error('Erro ao deletar categoria:', error)
      )
    }
  }

}
