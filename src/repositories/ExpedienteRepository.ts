import { EntityRepository, Repository } from 'typeorm'
import { Expediente } from '../entities/Expediente'

@EntityRepository(Expediente)
class ExpedienteRepository extends Repository<Expediente>{
}
export { ExpedienteRepository }