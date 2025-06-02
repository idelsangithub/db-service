export interface CreateSesionPagoDto {
  clienteId: number;
  valorCompra: number;
  token: string;
  idSesion: string;
  expiracionToken: Date;
}