import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { CategoriaService } from '../../categorias/shared/categoria.service';

import { Entrada } from './entrada.model'

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EntradaService extends BaseResourceService<Entrada> {
  constructor(
    protected injector: Injector,
    private categoriaService: CategoriaService
  ) {
    super(injector, "api/entradas", Entrada.fromJson)
   } 

  create(entrada: Entrada): Observable<Entrada> {
    return this.setCategoriaEEnvioAoServidor(entrada, super.create.bind(this));
  }

  update(entrada: Entrada): Observable<Entrada> {
    return this.setCategoriaEEnvioAoServidor(entrada, super.update.bind(this));
  }

  getByMonthAndYear(month: number, year: number): Observable<Entrada[]> {
    return this.getAll().pipe(
      map(entradas => this.filterByMonthAndYear(entradas, month, year))
    )
  }

  private setCategoriaEEnvioAoServidor(entrada: Entrada, envioFn: any): Observable<Entrada> {
    return this.categoriaService.getById(entrada.categoriaId).pipe(
      flatMap(categoria => {
        entrada.categoria = categoria;
        return envioFn(entrada);
      }),
      catchError(this.handleError))
  }

  private filterByMonthAndYear(entradas: Entrada[], month: number, year: number): Entrada[] {
    return entradas.filter(entrada => {
      const dataEntrada = moment(entrada.data, 'DD/MM/YYYY');
      const monthMatch = dataEntrada.month() + 1 == month;
      const yearMatch = dataEntrada.year() == year;
      
      if(monthMatch && yearMatch) {
        return entrada;
      }
    })
  }

}
