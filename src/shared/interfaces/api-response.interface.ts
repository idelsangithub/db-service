import { HttpStatus } from '@nestjs/common';

export interface ApiResponse<T> {
  code: HttpStatus | number; // Código HTTP o un código de error personalizado
  message: string;        // Mensaje descriptivo para el cliente
  data?: T;               // Datos resultantes de la operación (opcional)
  error?: string | string[]; // Detalles del error (opcional, para depuración o mensajes específicos)
}