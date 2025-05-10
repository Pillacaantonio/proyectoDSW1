import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacturaService } from '../../../../services/factura.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [FacturaService],
})
export class ModificarProductoComponent implements OnInit {
  @Output() productoActualizado: EventEmitter<any> = new EventEmitter();
  isViewMode: boolean = false;
  alertVisible: boolean = false;
  editForm!: FormGroup;
  public cargando: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModificarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private facturaService: FacturaService
  ) {
    this.isViewMode = data.isViewMode;
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.editForm = new FormGroup({
      id_producto: new FormControl(this.data.id_producto, [Validators.required]),
      nombre: new FormControl(this.data.nombre, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      descripcion: new FormControl(this.data.descripcion, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      precio: new FormControl(this.data.precio, [
      Validators.required,
      Validators.pattern(/^\d+(\.\d+)?$/)
      ]),
      stock: new FormControl(this.data.stock, [
      Validators.required,
      Validators.pattern(/^\d{1,4}$/)
      ]),
      fecharegistro: new FormControl(this.formatDate(this.data.fecharegistro)),
    });
  }
  private formatDate(date: string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
 @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  close(): void {
    this.closeModal.emit(true);
    this.dialogRef.close(true);
  }
  updateProducto() {
    if (this.editForm.valid) {
      const producto = this.editForm.value;
      producto.estado = producto.estado = 1;
      this.facturaService
        .actualizarProducto(producto.id_producto, producto)
        .subscribe(
          (data) => {
            console.log('Producto actualizado con éxito:', data);
            this.productoActualizado.emit(producto);
            this.showAlert();
          },
          (error) => {
            console.error('Hubo un error al actualizar el producto:', error);
          }
        );
    }
  }
  showAlert() {
      this.alertVisible = true;
      setTimeout(() => {
        this.alertVisible = false;
      }, 4000);
    }
}
