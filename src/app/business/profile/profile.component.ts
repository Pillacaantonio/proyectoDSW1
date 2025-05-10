import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FacturaService } from '../../services/factura.service';
import { Cliente } from '../../models/cliente.interface';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MatDialog } from '@angular/material/dialog';
import CrearClienteComponent from './mantenimiento/crear-cliente/crear-cliente.component';
<<<<<<< HEAD
import {
  state,
  style,
  animate,
  transition,
  trigger,
} from '@angular/animations';
import { ModificarClienteComponent } from './mantenimiento/modificar-cliente/modificar-cliente.component';
=======
>>>>>>> eab6072594cb86c948acb69437f134bfcc934e36

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    CrearClienteComponent,
    ButtonModule,
    TableModule,
  ],
  providers: [FacturaService],
  animations: [
    trigger('overlayContentAnimation', [
      state(
        'start',
        style({
          opacity: 0,
        })
      ),
      state(
        'end',
        style({
          opacity: 1,
        })
      ),
      transition('start <=> end', animate('300ms ease-in-out')),
    ]),
  ],
})
export default class ProfileComponent implements OnInit {
<<<<<<< HEAD
  cargando: boolean = false;
  currentPage: number = 1;
=======
 openView() {
throw new Error('Method not implemented.');
}
cargando: boolean = false;
currentPage: number = 1;
>>>>>>> eab6072594cb86c948acb69437f134bfcc934e36
  pageSize: number = 5;
  totalPages: number = 0;
  paginatedCliete: Cliente[] = [];
  public permision!: boolean;
  mensajeError: string = '';

<<<<<<< HEAD
  overlayState: string = 'start';

  clientes: Cliente[] = [];
  modalVisible = false;
=======

>>>>>>> eab6072594cb86c948acb69437f134bfcc934e36

  constructor(
    private facturaService: FacturaService,
    private dialog: MatDialog
<<<<<<< HEAD
  ) {}
=======
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

>>>>>>> eab6072594cb86c948acb69437f134bfcc934e36

  ngOnInit(): void {
    this.obtenerListadoClientes();
  }

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

  obtenerListadoClientes(): void {
    this.cargando = true;
    this.mensajeError = '';
    this.facturaService.getListadoClientes().subscribe(
      (data) => {
         this.clientes = data.map((cliente: { estado: number }) => ({
          ...cliente,
<<<<<<< HEAD
          estado: cliente.estado === 1,  
=======
          estado: cliente.estado === 1
>>>>>>> eab6072594cb86c948acb69437f134bfcc934e36
        }));

         this.totalPages = Math.ceil(this.clientes.length / this.pageSize);
        this.updatePaginatedCliente();  
        this.overlayState = 'end';  
        this.cargando = false;  
      },
      (error) => {
        console.error('Hubo un error al obtener los clientes', error);
        this.mensajeError = 'Error al cargar clientes';
        this.cargando = false;
      }
    );
  }

  openEdit(cliente: any): void {
    console.log('Cliente seleccionado para editar:', cliente);

    const dialogRef = this.dialog.open(ModificarClienteComponent, {
      data: cliente,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Cliente modificado', result);

        this.obtenerListadoClientes();
      }
    });
  }
  openView(cliente: any): void {
    console.log('Cliente seleccionado para ver:', cliente);

    const dialogRef = this.dialog.open(ModificarClienteComponent, {
      data: { cliente, isViewMode: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Cliente modificado', result);
        this.obtenerListadoClientes();
      }
    });
  }
  eliminarCliente(id_cliente: number): void {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.facturaService.eliminarCliente(id_cliente).subscribe(
        (response) => {
          console.log('Cliente eliminado:', response);
          this.obtenerListadoClientes();
        },
        (error) => {
          console.error('Error al eliminar el cliente', error);
        }
      );
    }
  }

  showModal() {
    this.modalVisible = true;
  }

  hideModal() {
    this.modalVisible = false;
  }

  refreshClientesList() {
    this.obtenerListadoClientes();
    this.hideModal();
  }
  updatePaginatedCliente() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCliete = this.clientes.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedCliente();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedCliente();
    }
  }
}
