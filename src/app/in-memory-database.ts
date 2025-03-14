import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";

export class InMemoryDatabase extends InMemoryDbService {

    createDb(){
        const categorias = [
            {id: 1, name: 'Moradia', description: 'Pagamento de contas da casa'},
            {id: 2, name: 'Saúde', description: 'Plano de saúde e remédios'},
            {id: 3, name: 'Lazer', description: 'Ciname, parques, praia, etc.'},
            {id: 4, name: 'Salário', description: 'Recebimento de salário'},
            {id: 5, name: 'Freelas', description: 'Trabalhos como freelancer'}
        ];

        return {categorias};
    }
}