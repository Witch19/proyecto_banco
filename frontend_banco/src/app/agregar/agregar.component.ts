import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductosService } from '../services/productos.service';
import { Producto } from '../models/producto.model';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {

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

    // FECHA REVISIÓN = 1 año más (VALIDADOR)
    date_revision: new FormControl('', [
      Validators.required,
      fechaRevisionValidator
    ])
  });

  agregar() {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const producto: Producto = {
      id: this.productoForm.value.id!,
      name: this.productoForm.value.name!,
      description: this.productoForm.value.description!,
      logo: this.productoForm.value.logo!,
      date_release: this.productoForm.value.date_release!,
      date_revision: this.productoForm.value.date_revision!,
    };

    this.productosService.crearProducto(producto).subscribe({
      next: () => {
        alert("Producto agregado correctamente");

        // 🔥 REGRESAR AUTOMÁTICAMENTE A LA LISTA
        this.router.navigate(['/']);
      },
      error: () => {
        alert("Error al agregar el producto");
      }
    });
  }
}

/* 🔥 VALIDADOR: FECHA_REVISIÓN = FECHA_LIBERACIÓN + 1 AÑO */
export const fechaRevisionValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {

  const parent = control.parent;
  if (!parent) return null;

  const fechaLiberacion = parent.get('date_release')?.value;
  const fechaRevision = control.value;

  if (!fechaLiberacion || !fechaRevision) return null;

  const liberacion = new Date(fechaLiberacion);
  const revision = new Date(fechaRevision);

  liberacion.setFullYear(liberacion.getFullYear() + 1);

  if (
    revision.getFullYear() === liberacion.getFullYear() &&
    revision.getMonth() === liberacion.getMonth() &&
    revision.getDate() === liberacion.getDate()
  ) {
    return null;
  }

  return { fechaIncorrecta: true };
};
