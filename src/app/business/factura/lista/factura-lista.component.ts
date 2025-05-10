import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {FacturaComponent} from '../documento/factura.component';
import {FtService} from '../../../services/ft.service';
import {FacturaService} from '../../../services/factura.service';
import {HttpClientModule} from '@angular/common/http';

export interface Factura {
  clienteId: number;
  clienteNombre?: string;
  clienteDocumento?: string;
  fecha?: Date;
  subtotal?: number;
  igv?: number;
  total?: number;
  activo?: boolean;
}

@Component({
  selector: 'app-factura-lista',
  standalone: true,
  imports: [CommonModule, MatDialogModule, HttpClientModule],
  templateUrl: './factura-lista.component.html',
  styleUrl: './factura-lista.component.scss',
  providers: [FtService],
})

export default class FacturaListaComponent implements OnInit {
  facturas: Factura[] = [
    {
      clienteId: 101,
      clienteNombre: 'Cliente Ejemplo 1',
      clienteDocumento: '20123456789',
      fecha: new Date('2024-05-01'),
      subtotal: 150.75,
      igv: 27.14,
      total: 177.89,
      activo: true
    },
    {
      clienteId: 102,
      clienteNombre: 'Cliente Ejemplo 2',
      clienteDocumento: '10456789231',
      fecha: new Date('2024-05-05'),
      subtotal: 200.50,
      igv: 36.09,
      total: 236.59,
      activo: false
    },
    {
      clienteId: 103,
      clienteNombre: 'Cliente Ejemplo 3',
      clienteDocumento: '10876543219',
      fecha: new Date('2024-05-10'),
      subtotal: 350.25,
      igv: 63.05,
      total: 413.30,
      activo: true
    }
  ];

  constructor(
    private FtService: FtService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.obtenerListadoFacturas();
  }

  obtenerListadoFacturas(): void {
    // this.cargando = true;
    // this.mensajeError = '';
    this.FtService.getListadoFacturas().subscribe(
      (data) => {
        console.log({facturas:data});
        this.facturas = data;
        // this.totalPages = Math.ceil(this.clientes.length / this.pageSize);
        // this.updatePaginatedCliente();
        // this.overlayState = 'end';
        // this.cargando = false;
      },
      (error) => {
        console.error('Error al obtener los clientes', error);
        // this.mensajeError = 'Error al cargar clientes';
        // this.cargando = false;
      }
    );
  }

  openFacturaModal(): void {
    const dialogRef = this.dialog.open(FacturaComponent, {
      width: '1500px',
      panelClass: 'factura-modal',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Lógica para agregar nueva factura
        this.facturas.push(result);
      }
    });
  }

}
