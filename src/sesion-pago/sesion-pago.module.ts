import { Module } from '@nestjs/common';
import { SesionPagoService } from './sesion-pago.service';
import { SesionPagoController } from './sesion-pago.controller';
import { SesionPago } from './entities/sesion-pago.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SesionPago])],
  providers: [SesionPagoService],
  controllers: [SesionPagoController],
  exports: [SesionPagoService], // Exportamos para que el Business Logic Service pueda usarlo
})
export class SesionPagoModule {}
