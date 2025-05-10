export interface Cliente {
    id_cliente: number;
    nombre: string;
    apellido: string;
    documentoIdentidad: string;
    direccion: string;
    telefono: string;
    email: string;
    FechaRegistro: Date;
    estado: boolean;
  }
