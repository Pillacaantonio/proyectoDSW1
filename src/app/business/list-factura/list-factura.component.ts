import { Component } from "@angular/core";
import { FacturaComponent } from "../factura/factura.component";

   
@Component({
  selector: 'app-list-factura',
  imports: [],
  templateUrl: './list-factura.component.html',
  styleUrl: './list-factura.component.scss'
})
export default class ListFacturaComponent {
  facturaComponent = new FacturaComponent();

  openModal(): void {
    this.facturaComponent.openModal();  
  }
 
}
