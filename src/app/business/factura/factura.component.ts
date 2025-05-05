import { Component } from '@angular/core';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export default class FacturaComponent {
  showModal: boolean = false;

  // Método para abrir el modal
  openModal() {
    this.showModal = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.showModal = false;
  }
}
