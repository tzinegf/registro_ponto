import { getCustomRepository, Repository } from "typeorm"
import { Contato } from "../entities/Contato";
import { ContatoRepository } from "../repositories/ContatoRepository"


interface IcontatoCreate {

    id: number;
    email: string;
    telefone1: string;
    telefone2: string;
    user_id:number;
}

class ContatosService{

    private contatoRepository: Repository<Contato>

    constructor(){
        this.contatoRepository = getCustomRepository(ContatoRepository)

    }



    async create({id,email,telefone1,telefone2,user_id}:IcontatoCreate){
       
        const contato = this.contatoRepository.create({
            id,email,telefone1,telefone2,user_id
        });

        await this.contatoRepository.save(contato);
       
        return contato;

    }

}
export{ContatosService}