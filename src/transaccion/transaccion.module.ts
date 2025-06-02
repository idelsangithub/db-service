import { Module } from '@nestjs/common';
import { TransaccionService } from './transaccion.service';
import { TransaccionController } from './transaccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaccion } from './entities/transaccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaccion])],
  providers: [TransaccionService],
  controllers: [TransaccionController],
  exports: [TransaccionService], // Exportamos para el Business Logic Service
})
export class TransaccionModule {}
