export interface UpdateSaldoDto {
  valor: number;
  tipo: 'increment' | 'decrement';
}