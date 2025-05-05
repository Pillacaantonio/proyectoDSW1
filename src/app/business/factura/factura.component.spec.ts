import { Component } from '@angular/core';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent {
  isModalOpen = false;

  // Función para abrir el modal
  openModal() {
    this.isModalOpen = true;
  }

  // Función para cerrar el modal
  closeModal() {
    this.isModalOpen = false;
  }
}
