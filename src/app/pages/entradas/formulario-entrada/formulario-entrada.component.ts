import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Entrada} from '../shared/entrada.model';
import { EntradaService } from '../shared/entrada.service';

import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { Categoria } from '../../categorias/shared/categoria.model';
import { CategoriaService } from '../../categorias/shared/categoria.service';

@Component({
  selector: 'app-formulario-entrada',
  templateUrl: './formulario-entrada.component.html',
  styleUrls: ['./formulario-entrada.component.css']
})
export class FormularioEntradaComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  entradaForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  entrada: Entrada = new Entrada();
  categorias: Array<Categoria>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '.',
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
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private entradaService: EntradaService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntradaForm();
    this.loadEntradas();
    this.loadCategorias();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if(this.currentAction === 'new') {
      this.createEntrada();
    } else {
      this.updateEntrada();
    }
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

  private setCurrentAction(): void {
    if(this.route.snapshot.url[0].path == "new") this.currentAction = "new";
    else this.currentAction = "edit";
  }

  private buildEntradaForm(): void {
    this.entradaForm = this.fb.group({
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

  private loadEntradas(): void {
    if(this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.entradaService.getEntradaById(+params.get("id")))
      ).subscribe(
        entrada => {
          this.entrada = entrada;
          this.entradaForm.patchValue(entrada);
        }, 
        (error) => alert('Ocorreu erro no servidor, tente mais tarde.')
      )
    }
  }

  private loadCategorias(): void {
    this.categoriaService.getAll().subscribe(
      categorias => this.categorias = categorias
    )
  }

  private setPageTitle(): void {
    if(this.currentAction == "new") this.pageTitle = "Nova Entrada";
    else {
      const nomeEntrada = this.entrada.nome || "";
      this.pageTitle = "Editar Entrada: " + nomeEntrada;
    }
  }

  private createEntrada(): void {
    const entrada: Entrada = Object.assign(new Entrada(), this.entradaForm.value);

    this.entradaService.create(entrada).subscribe(
      entrada => this.actionsForSuccess(entrada),
      error => this.actionsForError(error)
    )
  }

  private updateEntrada(): void {
    const entrada: Entrada = Object.assign(new Entrada(), this.entradaForm.value);

    this.entradaService.update(entrada).subscribe(
      entrada => this.actionsForSuccess(entrada),
      error => this.actionsForError(error)
    )
  }

  private actionsForSuccess( entrada: Entrada): void {
    toastr.success("Solicitação processada com sucesso!");
    this.router.navigateByUrl("entradas", {skipLocationChange: true}).then(
      () => this.router.navigate(["entradas", entrada.id, "edit"])
    )
  }

  private actionsForError(error): void {
    toastr.error("Ocorreu erro ao processar a solicitação!");
    this.submittingForm = false;
    if(error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."]
    }
  }
}
