export interface Cliente {
    id_cliente: number;
    nombre: string;
    apellido: string;
    documentoIdentidad: string;
    direccion: string;
    telefono: string;
    email: string;
    fechaRegistro: Date;
    estado: boolean;
  }