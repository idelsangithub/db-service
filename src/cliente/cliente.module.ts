import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])], // Registra la entidad Cliente para este módulo
  providers: [ClienteService],
  controllers: [ClienteController],
  exports: [ClienteService], // Exportamos ClienteService para que otros módulos puedan usarlo
})
export class ClienteModule {}
