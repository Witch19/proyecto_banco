import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Producto } from "../models/producto.model";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://localhost:3002/bp';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<{ data: Producto[] }> {
    return this.http.get<{ data: Producto[] }>(`${this.apiUrl}/products`);
  }

  getProducto(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/products/${id}`);
  }

  crearProducto(producto: Producto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/products`, producto);
  }

  actualizarProducto(producto: Producto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/products/${producto.id}`, producto);
  }
}
