import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TransaccionService } from './transaccion.service';
import { CreateTransaccionDto } from 'src/shared/dtos/create-transaccion.dto';
import { ApiResponse } from 'src/shared/interfaces/api-response.interface';
import { Transaccion } from './entities/transaccion.entity';

@Controller('transaccion')
export class TransaccionController {
  constructor(private readonly transaccionService: TransaccionService) {}


  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createTransaccionDto: CreateTransaccionDto): Promise<ApiResponse<Transaccion>> {
    try {
      const transaccion = await this.transaccionService.create(createTransaccionDto);
      return { code: HttpStatus.OK, message: 'Transacción registrada exitosamente.', data: transaccion };
    } catch (error) {
      return {
        code: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Error al registrar transacción.',
        error: error.response?.message || error.message,
      };
    }
  }
}
