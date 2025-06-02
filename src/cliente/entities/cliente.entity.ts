// db-service/src/cliente/cliente.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('cliente') // Es buena práctica dar un nombre explícito a la tabla
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Añadir unique: true para documento
  documento: string;

  @Column()
  nombres: string;

  @Column({ unique: true }) // Añadir unique: true para email
  email: string;

  @Column({ unique: true }) // Añadir unique: true para celular
  celular: string;

  // CLAVE: Definir saldo con un valor por defecto
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  saldo: number;

  // CLAVE: Usar @CreateDateColumn para que se genere automáticamente al crear
  @CreateDateColumn({ name: 'fecha_registro' })
  fechaRegistro: Date;

  // CLAVE: Usar @UpdateDateColumn para que se actualice automáticamente al actualizar
  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}