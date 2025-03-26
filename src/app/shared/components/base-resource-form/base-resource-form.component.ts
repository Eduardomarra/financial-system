import { OnInit, AfterContentChecked, Directive, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseResourceModel } from '../../models/base-resource.model'
import { BaseResourceService } from '../../services/base-resource.service'

import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

    currentAction: string;
    resourceForm: FormGroup;
    pageTitle: string;
    serverErrorMessages: string[] = null;
    submittingForm: boolean = false;

    protected fb: FormBuilder;
    protected route: ActivatedRoute;
    protected router: Router;

    constructor(
        protected injector: Injector,
        public resource: T,
        protected resourceService: BaseResourceService<T>,
        protected jsonDataToResourceFn: (jsonData: any) => T,
    ) { 
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
        this.fb = this.injector.get(FormBuilder);
    }

    ngOnInit() {
        this.setCurrentAction();
        this.buildResourceForm();
        this.loadResource();
    }

    ngAfterContentChecked(): void {
        this.setPageTitle();
    }

    submitForm() {
        this.submittingForm = true;
        if (this.currentAction === 'new') {
            this.createResource();
        } else {
            this.updateResource();
        }
    }

    protected setCurrentAction(): void {
        if (this.route.snapshot.url[0].path == "new") this.currentAction = "new";
        else this.currentAction = "edit";
    }

    protected loadResource(): void {
        if (this.currentAction == "edit") {
            this.route.paramMap.pipe(
                switchMap(params => this.resourceService.getById(+params.get("id")))
            ).subscribe(
                resource => {
                    this.resource = resource;
                    this.resourceForm.patchValue(resource);
                },
                (error) => alert('Ocorreu erro no servidor, tente mais tarde.')
            )
        }
    }

    protected setPageTitle(): void {
        if (this.currentAction == "new") this.pageTitle = this.criarTituloDaPagina();
        else {
            this.pageTitle = this.editarTituloDaPagina();
        }
    }

    protected criarTituloDaPagina(): string {
        return "Novo";
    
    }
    protected editarTituloDaPagina(): string {
        return "Editar";
    }
    
    protected createResource(): void {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

        this.resourceService.create(resource).subscribe(
            resource => this.actionsForSuccess(resource),
            error => this.actionsForError(error)
        )
    }

    protected updateResource(): void {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

        this.resourceService.update(resource).subscribe(
            resource => this.actionsForSuccess(resource),
            error => this.actionsForError(error)
        )
    }

    protected actionsForSuccess(resource: T): void {
        toastr.success("Solicitação processada com sucesso!");

        const baseComponentPath: string = this.route.snapshot.parent.url[0].path;
        this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true }).then(
            () => this.router.navigate([baseComponentPath, resource.id, "edit"])
        )
    }

    protected actionsForError(error): void {
        toastr.error("Ocorreu erro ao processar a solicitação!");
        this.submittingForm = false;
        if (error.status === 422) {
            this.serverErrorMessages = JSON.parse(error._body).errors;
        } else {
            this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."]
        }
    }

    protected abstract buildResourceForm(): void;
}
