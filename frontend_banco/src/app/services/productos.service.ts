import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Producto } from "../models/producto.model";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://localhost:3002/bp/products';

  constructor(private http: HttpClient) {}

  // Obtener lista
  getProductos(): Observable<{ data: Producto[] }> {
    return this.http.get<{ data: Producto[] }>(this.apiUrl);
  }

  // Crear producto
  crearProducto(producto: Producto): Observable<any> {
    return this.http.post<any>(this.apiUrl, producto);
  }
}
