import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';
import { Categoria} from '../shared/categoria.model';
import { CategoriaService } from '../shared/categoria.service';

@Component({
  selector: 'app-formulario-categoria',
  templateUrl: './formulario-categoria.component.html',
  styleUrls: ['./formulario-categoria.component.css']
})
export class FormularioCategoriaComponent extends BaseResourceFormComponent<Categoria> {

  categoria: Categoria = new Categoria();

  constructor(
    protected categoriaService: CategoriaService,
    protected injector: Injector,
  ) {
    super(injector, new Categoria(), categoriaService, Categoria.fromJson);
   }

  protected buildResourceForm(): void {
    this.resourceForm = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]], 
      descricao: [null]
    })
  }

  protected criarTituloDaPagina(): string {
    return 'Cadastro de Nova Categoria';
  }

  protected editarTituloDaPagina(): string {
    const categoriaNome = this.resource.nome || '';
    return 'Editando a Categoria: ' + categoriaNome;
  }

}
