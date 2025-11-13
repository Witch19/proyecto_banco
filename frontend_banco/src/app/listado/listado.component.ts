import { Component , OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Producto } from '../models/producto.model';
import { FiltroPipe } from '../filtro.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',
  standalone: true,
  imports: [CommonModule, FiltroPipe, FormsModule]

})
export class ListadoComponent implements OnInit {
  productos: any[]= [];
  busqueda: string = "";
  limite: number = 5;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.caragaProductos();
  }

  caragaProductos(){
    this.productosService.getProductos().subscribe({

      next:(resp)=>{
        this.productos= resp;
        console.log("productos: ",this.productos)
        //this.productos = resp.data; 
      },
      error:(err)=>{
        console.log("Error en cargar productos: ", err);
      }
    })
  }

}
