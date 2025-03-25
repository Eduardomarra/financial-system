import { Categoria } from "../../categorias/shared/categoria.model";
import { BaseResourceModel } from '../../../shared/models/base-resource.model'

export class Entrada extends BaseResourceModel{
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public tipo?: string,
        public valor?: string,
        public data?: string,
        public pago?: boolean,
        public categoriaId?: number,
        public categoria?: Categoria,
    ){
        super();
    }

    static types = {
        expense: "Despesa",
        revenue: "Receita"
    };

    get pagoText(): string {
        return this.pago? "Pago" : "Pendente";
    }
}