import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FacturaService } from '../../services/factura.service';
import { Producto } from '../../models/producto.interface';
import CrearProductoComponent from '../profile/mantenimiento/crear-producto/crear-producto.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, CrearProductoComponent],
  providers: [FacturaService]
})
export default class ProfileComponent implements OnInit {

  productos: Producto[] = [];
  modalVisible = false;  // Controla la visibilidad del modal

  constructor(private facturaService: FacturaService) { }

  ngOnInit(): void {
    this.obtenerListadoProductos();
  }

  obtenerListadoProductos(): void {
    this.facturaService.getListadoProductos().subscribe(
      (data) => {
        this.productos = data.map((producto: { etado: number; }) => ({
          ...producto,
          etado: producto.etado === 1  // Convierte el estado a booleano
        }));
      },
      (error) => {
        console.error('Hubo un error al obtener los Productos', error);
      }
    );
  }

  // Mostrar el modal
  showModal() {
    this.modalVisible = true;
  }

  // Ocultar el modal
  hideModal() {
    this.modalVisible = false;
  }

  // Método que se ejecuta cuando se emite el evento de refrescar la lista
  refreshProductosList() {
    this.obtenerListadoProductos();
    this.hideModal();  // Cierra el modal después de actualizar la lista
  }
}
