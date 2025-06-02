import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSesionPagoDto } from '../shared/dtos/create-sesion-pago.dto';
import { UpdateSesionPagoEstadoDto } from '../shared/dtos/update-sesion-pago-estado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SesionPago } from './entities/sesion-pago.entity';


@Injectable()
export class SesionPagoService {
  constructor(
    @InjectRepository(SesionPago)
    private sesionPagoRepository: Repository<SesionPago>,
  ) {}

  async create(createSesionPagoDto: CreateSesionPagoDto): Promise<SesionPago> {
    try {
      const nuevaSesion = this.sesionPagoRepository.create(createSesionPagoDto);
      return await this.sesionPagoRepository.save(nuevaSesion);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la sesión de pago.');
    }
    
  }
  

  async findOneByIdSesion(idSesion: string): Promise<SesionPago> {
    const sesion = await this.sesionPagoRepository.findOne({ where: { idSesion } });
    if (!sesion) {
      throw new NotFoundException('Sesión de pago no encontrada.');
    }
    return sesion;
  }

  async updateEstado(idSesion: string, updateDto: UpdateSesionPagoEstadoDto): Promise<SesionPago> {
    const sesion = await this.sesionPagoRepository.findOne({ where: { idSesion } });
    if (!sesion) {
      throw new NotFoundException('Sesión de pago no encontrada para actualizar el estado.');
    }

    if (sesion.estado !== 'PENDIENTE') {
      throw new ConflictException(`La sesión ya está en estado: ${sesion.estado}. No se puede actualizar.`);
    }

    sesion.estado = updateDto.estado;
    try {
      return await this.sesionPagoRepository.save(sesion);
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el estado de la sesión de pago.');
    }
  }


}
