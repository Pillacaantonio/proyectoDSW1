import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacturaService } from '../../../../services/factura.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.component.html',
  styleUrls: ['./modificar-cliente.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [FacturaService],
})
export class ModificarClienteComponent implements OnInit {
  @Output() clienteActualizado: EventEmitter<any> = new EventEmitter();
  isViewMode: boolean = false;

  editForm!: FormGroup;
  public cargando: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModificarClienteComponent>,
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
      id_cliente: new FormControl(this.data.id_cliente, [Validators.required]),
      nombre: new FormControl(this.data.nombre, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      apellido: new FormControl(this.data.apellido, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      documentoIdentidad: new FormControl(this.data.documentoIdentidad, [
        Validators.maxLength(255),
      ]),
      direccion: new FormControl(this.data.direccion, [
        Validators.maxLength(255),
      ]),
      email: new FormControl(this.data.email, [
        Validators.email,
        Validators.maxLength(255),
      ]),
      telefono: new FormControl(this.data.telefono, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(7),
        Validators.maxLength(15),
      ]),
      fechaRegistro: new FormControl(this.formatDate(this.data.fechaRegistro)),  
    });
  }
  private formatDate(date: string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  close(): void {
    this.dialogRef.close();
  }
  updateCliente() {
    if (this.editForm.valid) {
      const cliente = this.editForm.value;

      this.facturaService
        .actualizarCliente(cliente.id_cliente, cliente)
        .subscribe(
          (data) => {
            console.log('Cliente actualizado con éxito:', data);

            this.clienteActualizado.emit(cliente);

            this.dialogRef.close();
          },
          (error) => {
            console.error('Hubo un error al actualizar el cliente:', error);
          }
        );
    }
  }
}
