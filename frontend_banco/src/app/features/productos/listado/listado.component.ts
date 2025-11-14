import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../core/services/productos.service';
import { FiltroPipe } from '../../../filtro.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../core/models/producto.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listado',
  standalone: true,
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  imports: [CommonModule, RouterModule, FiltroPipe, FormsModule]
})
export class ListadoComponent implements OnInit {

  productos: Producto[] = [];   
  busqueda: string = "";
  limite: number = 5;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(){
    this.productosService.getProductos().subscribe({
      next: (resp) => {
        this.productos = resp.data;        
        console.log("Productos cargados: ", this.productos);
      },
      error: (err) => {
        console.error("Error en cargar productos: ", err);
      }
    });
  }
}
