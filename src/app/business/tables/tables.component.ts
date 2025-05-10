import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FacturaService } from '../../services/factura.service';
import { Producto } from '../../models/producto.interface';
import CrearProductoComponent from '../profile/mantenimiento/crear-producto/crear-producto.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, CrearProductoComponent, ButtonModule, TableModule],
  providers: [FacturaService],
  animations: [
   trigger('overlayContentAnimation', [
      state('start', style({
          opacity: 0
      })),
      state('end', style({
        opacity: 1
      })),
      transition('start <=> end', animate('300ms ease-in-out')),
      ])
   ]
})
export default class ProfileComponent implements OnInit {
 openView() {
throw new Error('Method not implemented.');
}
cargando: boolean = false;
currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  paginatedProducto: Producto[] = [];
  public permision!: boolean;
  mensajeError: string = '';


  productos: Producto[] = [];
  modalVisible = false;  // Controla la visibilidad del modal
  overlayState = 'start';

  constructor(
  private facturaService: FacturaService,
  private dialog: MatDialog
  ) { }

 openAdd() {
  this.dialog
      .open(CrearProductoComponent, {
        width: '750px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.obtenerListadoProductos();
          console.log('Modal cerrado con resultado:', result);
        }
      });
 }

  ngOnInit(): void {
    this.obtenerListadoProductos();
  }

  obtenerListadoProductos(): void {
    this.facturaService.getListadoProductos().subscribe(
      (data) => {
        this.productos = data.map((producto: { estado: number; }) => ({
          ...producto,
          estado: producto.estado === 1  // Convierte el estado a booleano
        }));
        this.overlayState = 'end';
        this.updatePaginatedFunerarias();
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
  // Actualiza las funerarias paginadas
    updatePaginatedFunerarias() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducto = this.productos.slice(startIndex, endIndex);
  }
  // Cambia a la página anterior
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedFunerarias();
    }
  }
  // Cambia a la siguiente página
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedFunerarias();
    }
  }
}
