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

  // Obtener un producto por ID
  getProducto(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // Crear producto
  crearProducto(producto: Producto): Observable<any> {
    return this.http.post<any>(this.apiUrl, producto);
  }

  // Actualizar producto
  actualizarProducto(producto: Producto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${producto.id}`, producto);
  }
}
