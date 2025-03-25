import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Categoria} from '../shared/categoria.model';
import { CategoriaService } from '../shared/categoria.service';

import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

@Component({
  selector: 'app-formulario-categoria',
  templateUrl: './formulario-categoria.component.html',
  styleUrls: ['./formulario-categoria.component.css']
})
export class FormularioCategoriaComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoriaForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  categoria: Categoria = new Categoria();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {

    this.setCurrentAction();
    this.buildCategoriaForm();
    this.loadCategorias();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if(this.currentAction === 'new') {
      this.createCategoria();
    } else {
      this.updateCategoria();
    }
  }

  private setCurrentAction(): void {
    if(this.route.snapshot.url[0].path == "new") this.currentAction = "new";
    else this.currentAction = "edit";
  }

  private buildCategoriaForm(): void {
    this.categoriaForm = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]], 
      descricao: [null]
    })
  }

  private loadCategorias(): void {
    if(this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.categoriaService.getById(+params.get("id")))
      ).subscribe(
        categoria => {
          this.categoria = categoria;
          this.categoriaForm.patchValue(categoria);
        }, 
        (error) => alert('Ocorreu erro no servidor, tente mais tarde.')
      )
    }
  }

  private setPageTitle(): void {
    if(this.currentAction == "new") this.pageTitle = "Nova Categoria";
    else {
      const nomeCategoria = this.categoria.nome || "";
      this.pageTitle = "Editar Categoria: " + nomeCategoria;
    }
  }

  private createCategoria(): void {
    const categoria: Categoria = Object.assign(new Categoria(), this.categoriaForm.value);

    this.categoriaService.create(categoria).subscribe(
      categoria => this.actionsForSuccess(categoria),
      error => this.actionsForError(error)
    )
  }

  private updateCategoria(): void {
    const categoria: Categoria = Object.assign(new Categoria(), this.categoriaForm.value);

    this.categoriaService.update(categoria).subscribe(
      categoria => this.actionsForSuccess(categoria),
      error => this.actionsForError(error)
    )
  }

  private actionsForSuccess( categoria: Categoria): void {
    toastr.success("Solicitação processada com sucesso!");
    this.router.navigateByUrl("categorias", {skipLocationChange: true}).then(
      () => this.router.navigate(["categorias", categoria.id, "edit"])
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
