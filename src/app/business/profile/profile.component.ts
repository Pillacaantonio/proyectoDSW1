import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FacturaService } from '../../services/factura.service';
import { Cliente } from '../../models/cliente.interface';
 import { ButtonModule } from 'primeng/button'; 
import { TableModule } from 'primeng/table';
import { trigger, state, style, animate, transition } from '@angular/animations';  // Importa los módulos de animación
import { MatDialog } from '@angular/material/dialog';
import CrearClienteComponent from './mantenimiento/crear-cliente/crear-cliente.component';
 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, CrearClienteComponent, ButtonModule, TableModule],
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
  paginatedCliete: Cliente[] = [];  
  public permision!: boolean;
  mensajeError: string = '';

 

  constructor(
    private facturaService: FacturaService,
    private dialog: MatDialog 

  ) { }


 openAdd() {
  this.dialog
      .open(CrearClienteComponent, {
        width: '750px',  
        disableClose: true,  
      })
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
           this.obtenerListadoClientes();
          console.log('Modal cerrado con resultado:', result);
        }
      });
 }

  clientes: Cliente[] = [];
  modalVisible = false;  
  overlayState = 'start';   


  ngOnInit(): void {
    this.obtenerListadoClientes();
  }

  obtenerListadoClientes(): void {
    this.facturaService.getListadoClientes().subscribe(
      (data) => {
        this.clientes = data.map((cliente: { estado: number; }) => ({
          ...cliente,
          estado: cliente.estado === 1  
        }));

         this.overlayState = 'end';
      },
      (error) => {
        console.error('Hubo un error al obtener los clientes', error);
      }
    );
  }

  showModal() {
    this.modalVisible = true;
  }

  hideModal() {
    this.modalVisible = false;
  }

  refreshClientesList() {
    this.obtenerListadoClientes();
    this.hideModal();  // Cierra el modal después de actualizar la lista
  }

  // Actualiza las funerarias paginadas
  updatePaginatedFunerarias() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCliete = this.clientes.slice(startIndex, endIndex);
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
