export interface Producto {
    id_producto: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    fecharegistro: Date;
    estado: number; // Cambiado a number para que coincida con el backend
  }
