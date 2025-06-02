export interface CreateTransaccionDto {
  clienteId: number;
  tipo: string; // 'RECARGA', 'PAGO'
  valor: number;
  estado: string; // 'EXITO', 'FALLO', 'PENDIENTE'
}