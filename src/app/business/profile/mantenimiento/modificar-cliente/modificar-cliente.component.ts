import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { Cliente } from '../../../../models/cliente.interface'; // Asegúrate de importar Cliente

@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.component.html',
  styleUrls: ['./modificar-cliente.component.scss'],
  standalone: true,
  imports: [FormsModule],  // Asegúrate de agregar FormsModule aquí
})
export class ModificarClienteComponent {
  @Input() clienteToEdit: Cliente = {   
    id_cliente: 0,
    nombre: '',
    apellido: '',
    documentoIdentidad: '',
    direccion: '',
    telefono: '',
    email: '',
    fechaRegistro: new Date(),
    estado: true
  };

  constructor() {}

  updateCliente() {
    if (this.clienteToEdit) {
      // Llama al servicio para actualizar
      console.log(this.clienteToEdit);  // Verifica que los datos estén correctos
    }
  }

  close() {
    // Cierra el modal
  }
}
