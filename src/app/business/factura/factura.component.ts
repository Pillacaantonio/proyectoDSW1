import { Component } from '@angular/core';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent {
  isModalOpen = false;

   openModal() {
    this.isModalOpen = true;
  }

   closeModal() {
    this.isModalOpen = false;
  }
}
