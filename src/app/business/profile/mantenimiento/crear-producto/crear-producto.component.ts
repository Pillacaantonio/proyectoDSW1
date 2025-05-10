import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacturaService } from '../../../../services/factura.service';
import { Producto } from '../../../../models/producto.interface';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Output, Inject, inject, OnInit } from '@angular/core';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'],
  standalone: true,
  imports: [CommonModule,
   HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule],
  providers: [FacturaService]
})
export default class CrearProductoComponent implements OnInit{

  public registerForm!: FormGroup;
  public cargando: boolean = false;
  private generalService = inject(FacturaService);
  item: any;
  viewOnly: boolean = false;
  isLoadingResults = true;
  alertVisible: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<CrearProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.registerForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      precio: new FormControl(null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
      stock: new FormControl(null, [Validators.required,Validators.pattern(/^\d+(\.\d+)?$/)]),
      fecharegistro: new FormControl(null, [Validators.required]),
      estado: new FormControl(null, [Validators.required])
    });
  }

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  close() {
  this.closeModal.emit(true);
  this.dialogRef.close(true);
  }

  createProducto() {
    if (this.registerForm.valid) {
      const producto = this.registerForm.value;
      producto.estado = producto.estado ? 1 : 0;
      producto.fecharegistro = new Date(producto.fecharegistro).toISOString();

      this.facturaService.crearProducto(producto).subscribe(
        (data) => {
          console.log('Producto creado con éxito:', data);
          this.showAlert();
          this.resetForm(); // Limpiar los inputs
        },
        (error) => {
          console.error('Hubo un error al crear el producto', error);
          // Mostrar los errores de validación recibidos del backend
          console.log('Errores de validación:', error.error.errors);
        }
      );
    }
  }

  resetForm() {
    this.registerForm.reset({
      nombre: '',
      descripcion: '',
      precio: null,
      stock: null,
      fecharegistro: null
    });
  }
  showAlert() {
    this.alertVisible = true;
    setTimeout(() => {
      this.alertVisible = false;
    }, 4000);
  }

}

