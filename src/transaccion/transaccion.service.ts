import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransaccionDto } from '../shared/dtos/create-transaccion.dto';
import { Transaccion } from './entities/transaccion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransaccionService {
  constructor(
    @InjectRepository(Transaccion)
    private transaccionRepository: Repository<Transaccion>,
  ) {}

  async create(createTransaccionDto: CreateTransaccionDto): Promise<Transaccion> {
    try {
      const nuevaTransaccion = this.transaccionRepository.create(createTransaccionDto);
      return await this.transaccionRepository.save(nuevaTransaccion);
    } catch (error) {
      throw new InternalServerErrorException('Error al registrar la transacción.');
    }
  }


}
