import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from '../shared/dtos/create-cliente.dto';
import { UpdateSaldoDto } from '../shared/dtos/update-saldo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ClienteService {
    constructor(
      @InjectRepository(Cliente)
      private clienteRepository: Repository<Cliente>,
    ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    console.log('db-service: ClienteService.create - Recibiendo:', createClienteDto);
    console.log('AppService: Iniciando registro de cliente...');
    try {
      const existingCliente = await this.clienteRepository.findOne({
        where: [{ documento: createClienteDto.documento }, { email: createClienteDto.email }, { celular: createClienteDto.celular }],
      });

      if (existingCliente) {
        if (existingCliente.documento === createClienteDto.documento) {
          throw new ConflictException('Ya existe un cliente con este documento.');
        }
        if (existingCliente.email === createClienteDto.email) {
          throw new ConflictException('Ya existe un cliente con este email.');
        }
        if (existingCliente.celular === createClienteDto.celular) {
          throw new ConflictException('Ya existe un cliente con este celular.');
        }
      }

      const newCliente = this.clienteRepository.create(createClienteDto);
      return await this.clienteRepository.save(newCliente);
    } catch (error) {
      console.error('AppService: ERROR EN registroCliente - DETALLE:', error);
      console.error('AppService: Mensaje de error específico:', error.message);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al registrar el cliente en la base de datos.');
    }
  }

  async findOneByDocumentoAndCelular(documento: string, celular: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({ where: { documento, celular } });
    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado con el documento y celular proporcionados.');
    }
    return cliente;
  }

  async updateSaldo(id: number, updateSaldoDto: UpdateSaldoDto): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({ where: { id } });
    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado para actualizar el saldo.');
    }

    let nuevoSaldo: number;
    if (updateSaldoDto.tipo === 'increment') {
      nuevoSaldo = parseFloat(cliente.saldo.toString()) + parseFloat(updateSaldoDto.valor.toString());
    } else {
      if (parseFloat(cliente.saldo.toString()) < parseFloat(updateSaldoDto.valor.toString())) {
        throw new ConflictException('Saldo insuficiente.');
      }
      nuevoSaldo = parseFloat(cliente.saldo.toString()) - parseFloat(updateSaldoDto.valor.toString());
    }

    cliente.saldo = nuevoSaldo;
    try {
      return await this.clienteRepository.save(cliente);
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el saldo del cliente.');
    }
  }

  async findOneById(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({ where: { id } });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado.`);
    }
    return cliente;
  }

}
