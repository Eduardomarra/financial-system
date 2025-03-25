import { BaseResourceModel } from '../../../shared/models/base-resource.model'

export class Categoria extends BaseResourceModel {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string
    ){
        super();
    }
}