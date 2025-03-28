import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { CategoriaService } from '../../categorias/shared/categoria.service';

import { Entrada } from './entrada.model'

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

  private setCategoriaEEnvioAoServidor(entrada: Entrada, envioFn: any): Observable<Entrada> {
    return this.categoriaService.getById(entrada.categoriaId).pipe(
      flatMap(categoria => {
        entrada.categoria = categoria;
        return envioFn(entrada);
      }),
      catchError(this.handleError))
  }

}
