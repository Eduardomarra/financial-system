import { Component, OnInit } from '@angular/core';

import { Entrada } from '../shared/entrada.model'
import { EntradaService } from '../shared/entrada.service'

@Component({
  selector: 'app-lista-entradas',
  templateUrl: './lista-entradas.component.html',
  styleUrls: ['./lista-entradas.component.css']
})
export class ListaEntradaComponent implements OnInit {

  entradas: Entrada[] = [];

  constructor(
    private entradaService: EntradaService
  ) { }

  ngOnInit() {
    this.entradaService.getAll().subscribe(
      entradas => this.entradas = entradas.sort((a, b) => b.id - a.id),
      error => console.error('Erro ao carregar entradas:', error)
    )
  }

  deletEntrada(entrada: Entrada) {
    const confirmDelete = confirm("Confirma exclusão da entrada?");

    if(confirmDelete) {
      this.entradaService.delete(entrada.id).subscribe(
        () => {
          this.entradas = this.entradas.filter(c => c.id!== entrada.id);
        },
        error => console.error('Erro ao deletar entrada:', error)
      )
    }
  }

}
