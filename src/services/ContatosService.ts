import { getCustomRepository } from "typeorm"
import { ContatoRepository } from "../repositories/ContatoRepository"


interface IcontatoCreate {

    id: number;
    email: string;
    telefone1: string;
    telefone2: string;
    user_id:number;
}

class ContatosService{
    async create({id,email,telefone1,telefone2,user_id}:IcontatoCreate){
        const contatoRepository = getCustomRepository(ContatoRepository);
       
        const contato = contatoRepository.create({
            id,email,telefone1,telefone2,user_id
        });

        await contatoRepository.save(contato);
       
        return contato;

    }

}
export{ContatosService}