import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
//Esta entidad registrará cada recarga y pago para llevar un historial detallado.
@Entity('transacciones')
export class Transaccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cliente_id' })
  clienteId: number;

  @ManyToOne(() => Cliente, cliente => cliente.id)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ length: 20 })
  tipo: string; // 'RECARGA', 'PAGO'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @CreateDateColumn({ name: 'fecha_transaccion' })
  fechaTransaccion: Date;

  @Column({ length: 20 })
  estado: string; // 'EXITO', 'FALLO', 'PENDIENTE'
}