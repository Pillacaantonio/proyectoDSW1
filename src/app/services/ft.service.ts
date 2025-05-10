import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FtService {

  private apiUrl = 'https://localhost:44363/api';

  constructor(private http: HttpClient) {
  }

  getListadoFacturas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Factura/GetFacturas`);
  }

}
