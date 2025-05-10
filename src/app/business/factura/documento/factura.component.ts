import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface Cliente {
  id: number;
  nombre: string;
  documento: string;
  direccion: string;
}

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

interface ProductoSeleccionado {
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent {
  clientes: Cliente[] = [
    { id: 1, nombre: 'Cliente Ejemplo 1', documento: '20123456789', direccion: 'Av. Principal 123' },
    { id: 2, nombre: 'Cliente Ejemplo 2', documento: '10456789231', direccion: 'Jr. Secundario 456' }
  ];

  productos: Producto[] = [
    { id: 1, nombre: 'Laptop Lenovo', descripcion: '14.5" 8GB RAM I7', precio: 2500, stock: 10 },
    { id: 2, nombre: 'Monitor Dell', descripcion: '27" 4K UHD', precio: 1500, stock: 5 },
    { id: 3, nombre: 'Teclado Mecánico', descripcion: 'RGB Retroiluminado', precio: 120, stock: 20 }
  ];

  clienteSeleccionado: Cliente | null = null;
  productosSeleccionados: ProductoSeleccionado[] = [];
  clienteBusqueda = '';
  productoBusqueda = '';
  clientesFiltrados: Cliente[] = [];
  productosFiltrados: Producto[] = [];

  constructor(
    private dialogRef: MatDialogRef<FacturaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.filtrarClientes();
    this.filtrarProductos();
  }

  filtrarClientes() {
    if (!this.clienteBusqueda) {
      this.clientesFiltrados = [...this.clientes];
      return;
    }
    const termino = this.clienteBusqueda.toLowerCase();
    this.clientesFiltrados = this.clientes.filter(c =>
      c.nombre.toLowerCase().includes(termino) ||
      c.documento.toLowerCase().includes(termino)
    );
  }

  filtrarProductos() {
    if (!this.productoBusqueda) {
      this.productosFiltrados = [...this.productos];
      return;
    }
    const termino = this.productoBusqueda.toLowerCase();
    this.productosFiltrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(termino) ||
      p.descripcion.toLowerCase().includes(termino)
    );
  }

  seleccionarCliente(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.clienteBusqueda = '';
  }

  agregarProducto(producto: Producto) {
    const existente = this.productosSeleccionados.find(p => p.producto.id === producto.id);
    if (existente) {
      existente.cantidad++;
    } else {
      this.productosSeleccionados.push({ producto, cantidad: 1 });
    }
    this.productoBusqueda = '';
    this.filtrarProductos();
  }

  ajustarCantidad(index: number, cambio: number) {
    const item = this.productosSeleccionados[index];
    const nuevaCantidad = item.cantidad + cambio;

    if (nuevaCantidad < 1) {
      this.removerProducto(index);
    } else {
      item.cantidad = nuevaCantidad;
    }
  }

  removerProducto(index: number) {
    this.productosSeleccionados.splice(index, 1);
  }

  calcularSubtotal(): number {
    return this.productosSeleccionados.reduce((total, item) =>
      total + (item.producto.precio * item.cantidad), 0);
  }

  calcularIgv(): number {
    return this.calcularSubtotal() * 0.18;
  }

  calcularTotal(): number {
    return this.calcularSubtotal() + this.calcularIgv();
  }

  generarFactura() {
    if (!this.clienteSeleccionado || this.productosSeleccionados.length === 0) return;

    const factura = {
      cliente: this.clienteSeleccionado,
      productos: this.productosSeleccionados,
      subtotal: this.calcularSubtotal(),
      igv: this.calcularIgv(),
      total: this.calcularTotal(),
      fecha: new Date()
    };

    this.dialogRef.close(factura);
  }
}
