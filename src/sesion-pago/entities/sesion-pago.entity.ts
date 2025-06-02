import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';

@Entity('sesiones_pago')
@Index(['idSesion'], { unique: true }) // Asegura que el ID de sesión sea único
export class SesionPago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cliente_id' })
  clienteId: number;

  @ManyToOne(() => Cliente, cliente => cliente.id)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valorCompra: number;

  @Column({ length: 6 }) // Token de 6 dígitos
  token: string;

  @Column({ length: 36 }) // Usaremos UUIDs para idSesion, que suelen ser de 36 caracteres
  idSesion: string; // ID de sesión que se enviará al cliente para confirmar el pago

  @Column()
  expiracionToken: Date; // Fecha y hora de expiración del token

  @Column({ length: 20, default: 'PENDIENTE' })
  estado: string; // PENDIENTE, CONFIRMADO, CANCELADO

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}