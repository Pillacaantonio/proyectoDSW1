import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FacturaService } from '../../../../services/factura.service';
import { Producto } from '../../../../models/producto.interface';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [FacturaService]
})
export default class CrearProductoComponent {
  newProducto: Producto = {
    id_producto: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    fecharegistro: new Date(),
    estado: 0 // Cambiado a number para que coincida con el backend
  };

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  alertVisible: boolean = false;

  constructor(private facturaService: FacturaService) {}

   close() {
    this.closeModal.emit(false);
  }

   createProducto() {
    this.newProducto.estado = this.newProducto.estado ? 1 : 0; // Convertir a número para que coincida con el backend
    this.facturaService.crearProducto(this.newProducto).subscribe(
      (data) => {
        console.log('Producto creado con éxito:', data);
        this.showAlert();
        this.resetForm(); // Limpiar los inputs
        //this.closeModal.emit(true); // Emitir true para indicar éxito
      },
      (error) => {
        console.error('Hubo un error al crear el producto', error);
      }
    );
  }
  resetForm() {
    this.newProducto = {
      id_producto: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      fecharegistro: new Date(),
      estado: 0
    };
  }
  showAlert() {
    this.alertVisible = true; // Mostrar la alerta
    setTimeout(() => {
      this.alertVisible = false; // Ocultar la alerta después de 3 segundos
    }, 4000);
  }
}
