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
import { SesionPagoService } from './sesion-pago.service';
import { CreateSesionPagoDto } from 'src/shared/dtos/create-sesion-pago.dto';
import { ApiResponse } from 'src/shared/interfaces/api-response.interface';
import { SesionPago } from './entities/sesion-pago.entity';
import { UpdateSesionPagoEstadoDto } from 'src/shared/dtos/update-sesion-pago-estado.dto';

@Controller('sesion-pago')
export class SesionPagoController {
  constructor(private readonly sesionPagoService: SesionPagoService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createSesionPagoDto: CreateSesionPagoDto): Promise<ApiResponse<SesionPago>> {
    try {
      const sesionPago = await this.sesionPagoService.create(createSesionPagoDto);
      return { code: HttpStatus.OK, message: 'Sesión de pago creada exitosamente.', data: sesionPago };
    } catch (error) {
      return {
        code: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Error al crear sesión de pago.',
        error: error.response?.message || error.message,
      };
    }
  }

  @Get(':idSesion')
  @HttpCode(HttpStatus.OK)
  async findOneByIdSesion(@Param('idSesion') idSesion: string): Promise<ApiResponse<SesionPago>> {
    try {
      const sesionPago = await this.sesionPagoService.findOneByIdSesion(idSesion);
      return { code: HttpStatus.OK, message: 'Sesión de pago encontrada.', data: sesionPago };
    } catch (error) {
      return {
        code: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Error al buscar sesión de pago.',
        error: error.response?.message || error.message,
      };
    }
  }


  @Patch(':idSesion/estado')
  @HttpCode(HttpStatus.OK)
  async updateEstado(
    @Param('idSesion') idSesion: string,
    @Body() updateDto: UpdateSesionPagoEstadoDto,
  ): Promise<ApiResponse<SesionPago>> {
    try {
      const updatedSesion = await this.sesionPagoService.updateEstado(idSesion, updateDto);
      return { code: HttpStatus.OK, message: 'Estado de sesión de pago actualizado.', data: updatedSesion };
    } catch (error) {
      return {
        code: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Error al actualizar estado de sesión de pago.',
        error: error.response?.message || error.message,
      };
    }
  }

}
