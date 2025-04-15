import { OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model'
import { BaseResourceService } from '../../services/base-resource.service'



export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

    resources: T[] = [];

    constructor(
        protected resourceService: BaseResourceService<T>
    ) { }
    
    ngOnInit(): void {
        this.resourceService.getAll().subscribe(
            resources => this.resources = resources.sort((a, b) => b.id - a.id),
            error => console.error('Erro ao carregar recursos:', error)
        )
    }

    protected deletResource(resource: T) {
        const confirmDelete = confirm("Confirma exclusão do item?");

        if(confirmDelete) {
            this.resourceService.delete(resource.id).subscribe(
                () => {
                    this.resources = this.resources.filter(c => c.id !== resource.id);
                },
                error => console.error('Erro ao deletar recurso:', error)
            )
        }
    }
}
