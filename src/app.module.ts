import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './cliente/cliente.module';
import { Cliente} from './cliente/entities/cliente.entity';
import { SesionPagoModule } from './sesion-pago/sesion-pago.module';
import { SesionPago} from './sesion-pago/entities/sesion-pago.entity';
import { TransaccionModule } from './transaccion/transaccion.module';
import { Transaccion } from './transaccion/entities/transaccion.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'billetera_db',
      entities: [Cliente, SesionPago, Transaccion],
      synchronize: true, // ¡ATENCIÓN! Usar solo en desarrollo
      logging: false,
    }),
    ClienteModule,
    SesionPagoModule,
    TransaccionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
