import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ProductosService } from '../../../core/services/productos.service';
import { Producto } from '../../../core/models/producto.model';

// ✔ Importar validador desde validators
import { fechaRevisionValidator } from '../validators/fecha-revision.validator';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {

  errorMsg = ''; 

  constructor(
    private productosService: ProductosService,
    private router: Router
  ) {}

  productoForm = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200)
    ]),
    logo: new FormControl('', Validators.required),
    date_release: new FormControl('', Validators.required),

    date_revision: new FormControl('', [
      Validators.required,
      fechaRevisionValidator
    ])
  });

  agregar() {
    this.errorMsg = '';

    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      this.errorMsg = 'Corrige los campos en rojo.';
      return;
    }

    const producto = this.productoForm.getRawValue() as Producto;

    this.productosService.crearProducto(producto).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMsg = err.message || 'Error al agregar el producto.';
      }
    });
  }
}
