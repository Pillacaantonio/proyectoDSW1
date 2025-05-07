import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FacturaService } from '../../../../services/factura.service';
import { Cliente } from '../../../../models/cliente.interface';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [FacturaService]
})
export default class CrearClienteComponent {
  newClient: Cliente = {
    id_cliente: 0,
    nombre: '',
    apellido: '',
    documentoIdentidad: '',
    direccion: '',
    telefono: '',
    email: '',
    fechaRegistro: new Date(),
    etado: true
  };

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(private facturaService: FacturaService) {}

   close() {
    this.closeModal.emit(false);
  }

   createCliente() {
    this.facturaService.crearCliente(this.newClient).subscribe(
      (data) => {
        console.log('Cliente creado con éxito:', data);
        this.close();
      },
      (error) => {
        console.error('Hubo un error al crear el cliente', error);
      }
    );
  }
}
