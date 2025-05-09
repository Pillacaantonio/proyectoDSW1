import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FacturaService } from '../../services/factura.service';
import { Cliente } from '../../models/cliente.interface';
import CrearClienteComponent from './mantenimiento/crear-cliente/crear-cliente.component';
import { ButtonModule } from 'primeng/button'; 
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, CrearClienteComponent,ButtonModule,TableModule],
  providers: [FacturaService]
})
export default class ProfileComponent implements OnInit {
cargando: any;
mensajeError: any;
openAdd() {
throw new Error('Method not implemented.');
}

  clientes: Cliente[] = [];
  modalVisible = false;  // Controla la visibilidad del modal

  constructor(private facturaService: FacturaService) { }

  ngOnInit(): void {
    this.obtenerListadoClientes();
  }

  obtenerListadoClientes(): void {
    this.facturaService.getListadoClientes().subscribe(
      (data) => {
        this.clientes = data.map((cliente: { etado: number; }) => ({
          ...cliente,
          etado: cliente.etado === 1  // Convierte el estado a booleano
        }));
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
}
