import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Producto } from "../models/producto.model";

@Injectable({
    providedIn: 'root'
})

export class ProductosService {
    private apiUrl = 'http://localhost:3002/bp/products';
    constructor(private http: HttpClient) {}

    getProductos(): Observable<Producto[]> {
        return this.http.get<Producto[]>(this.apiUrl);
    }

    crearProducto(producto: Producto): Observable<any> {
        return this.http.post<any>(this.apiUrl, producto);
    }
}