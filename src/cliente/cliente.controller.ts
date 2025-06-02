import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto} from '../shared/dtos/create-cliente.dto';
import { UpdateSaldoDto} from '../shared/dtos/update-saldo.dto';
import { Cliente} from './entities/cliente.entity';
import { ApiResponse } from '../shared/interfaces/api-response.interface'

@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createClienteDto: CreateClienteDto): Promise<ApiResponse<Cliente>> {
    console.log(createClienteDto);
    try {
      const cliente = await this.clienteService.create(createClienteDto);
      return { code: HttpStatus.OK, message: 'Cliente registrado exitosamente.', data: cliente };
    } catch (error) {
      return {
        code: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Error al registrar cliente.',
        error: error.response?.message || error.message,
      };
    }
  }

  @Get(':documento/:celular')
  @HttpCode(HttpStatus.OK)
  async findOneByDocumentoAndCelular(
    @Param('documento') documento: string,
    @Param('celular') celular: string,
  ): Promise<ApiResponse<Cliente>> {
    try {
      const cliente = await this.clienteService.findOneByDocumentoAndCelular(documento, celular);
      return { code: HttpStatus.OK, message: 'Cliente encontrado.', data: cliente };
    } catch (error) {
      return {
        code: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Error al buscar cliente.',
        error: error.response?.message || error.message,
      };
    }
  }

  @Patch(':id/saldo')
  @HttpCode(HttpStatus.OK)
  async updateSaldo(@Param('id') id: string, @Body() updateSaldoDto: UpdateSaldoDto): Promise<ApiResponse<Cliente>> {
    try {
      const updatedCliente = await this.clienteService.updateSaldo(+id, updateSaldoDto);
      return { code: HttpStatus.OK, message: 'Saldo actualizado exitosamente.', data: updatedCliente };
    } catch (error) {
      return {
        code: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Error al actualizar saldo.',
        error: error.response?.message || error.message,
      };
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOneById(@Param('id') id: string): Promise<ApiResponse<Cliente>> {
    try {
      const cliente = await this.clienteService.findOneById(+id);
      return { code: HttpStatus.OK, message: 'Cliente encontrado por ID.', data: cliente };
    } catch (error) {
      return {
        code: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Error al buscar cliente por ID.',
        error: error.response?.message || error.message,
      };
    }
  }


}
