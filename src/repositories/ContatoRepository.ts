import { EntityRepository, Repository } from "typeorm";
import {Contato} from '../entities/Contato'

@EntityRepository(Contato)
class ContatoRepository extends Repository<Contato>{}

export {ContatoRepository};