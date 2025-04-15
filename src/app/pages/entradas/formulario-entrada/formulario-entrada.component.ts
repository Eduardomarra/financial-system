import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { Entrada} from '../shared/entrada.model';
import { EntradaService } from '../shared/entrada.service';

import { Categoria } from '../../categorias/shared/categoria.model';
import { CategoriaService } from '../../categorias/shared/categoria.service';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-formulario-entrada',
  templateUrl: './formulario-entrada.component.html',
  styleUrls: ['./formulario-entrada.component.css']
})
export class FormularioEntradaComponent extends BaseResourceFormComponent<Entrada> implements OnInit {

  categorias: Array<Categoria>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ",",
  }

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }

  constructor(
    protected entradaService: EntradaService,
    protected categoriaService: CategoriaService,
    protected injector: Injector,
  ) {
    super(injector, new Entrada(), entradaService, Entrada.fromJson);
  }

  ngOnInit(): void {
    this.loadCategorias();
    super.ngOnInit();
  }

  get typeOptions(): Array<any> {
    return Object.entries(Entrada.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        }
      }
    )
  }

  loadCategorias(): void {
    this.categoriaService.getAll().subscribe(
      categorias => this.categorias = categorias
    )
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]], 
      descricao: [null],
      tipo: ["expense", Validators.required],
      valor: [null, Validators.required],
      data: [null, Validators.required],
      pago: [true, Validators.required],
      categoriaId: [null, Validators.required],
    })
  }

  protected criarTituloDaPagina(): string {
    return 'Cadastro de Novo Lançamento';
  }

  protected editarTituloDaPagina(): string {
    const lancamentoNome = this.resource.nome || '';
    return 'Editando o Lançamento: ' + lancamentoNome;
  }

}
