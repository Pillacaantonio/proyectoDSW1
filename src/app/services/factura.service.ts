import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private apiUrl = 'https://localhost:44363/api';

  constructor(private http: HttpClient) { }

   getClientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Cliente/SearchClientes`);
  }

   crearCliente(cliente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Cliente/CrearCliente`, cliente);
  }

   getCliente(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Cliente/GetOneCliente/${id}`);
  }

   actualizarCliente(id: number, cliente: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Cliente/Update/${id}`, cliente);
  }

   getFacDetalle(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/FacDetalle/GetOneFacDetalle/${id}`);
  }

   crearProducto(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Producto/CrearProducto`, producto);
  }

   getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Producto/SearchProducto`);
  }

   actualizarProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Producto/Update/${id}`, producto);
  }
  getListadoClientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Cliente/ListadoClientes`);
  }
}
