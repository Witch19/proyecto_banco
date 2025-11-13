import { Component, inject } from '@angular/core';
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

    // 🔥 validación corregida y funcionando
    date_revision: new FormControl('', [
      Validators.required,
      fechaRevisionValidator
    ])
  });

  productosService = inject(ProductosService);

  agregar() {
    console.log("Formulario: ", this.productoForm.value);
    console.log("entre a agregar");

    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      console.warn("❌ Formulario inválido:", this.productoForm.errors);
      return;
    }

    console.log("✅ Formulario válido, enviando al backend...");

    const producto: Producto = {
      id: this.productoForm.value.id!,
      name: this.productoForm.value.name!,
      description: this.productoForm.value.description!,
      logo: this.productoForm.value.logo!,
      date_release: this.productoForm.value.date_release!,
      date_revision: this.productoForm.value.date_revision!,
    };

    this.productosService.crearProducto(producto).subscribe({
      next: (resp) => {
        console.log("Producto creado", resp);
        alert("Producto agregado correctamente");
        this.reiniciar();
      },
      error: (err) => {
        console.error("Error al crear el producto", err);
        alert("Error al agregar el producto");
      }
    });
  }

  reiniciar() {
    this.productoForm.reset();
  }
}

// 🔥 VALIDADOR CORREGIDO
export const fechaRevisionValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {

  if (!control.parent) return null;

  const fechaLiberacion = control.parent.get('date_release')?.value;
  const fechaRevision = control.value;

  // Si falta una fecha, no validamos aún
  if (!fechaLiberacion || !fechaRevision) return null;

  const liberacion = new Date(fechaLiberacion);
  const revision = new Date(fechaRevision);

  // 🔥 Regla: revisión = liberación + 1 año EXACTO
  liberacion.setFullYear(liberacion.getFullYear() + 1);

  if (
    revision.getFullYear() === liberacion.getFullYear() &&
    revision.getMonth() === liberacion.getMonth() &&
    revision.getDate() === liberacion.getDate()
  ) {
    return null; // ✔ válido
  }

  return { fechaIncorrecta: true }; // ❌ incorrecto
};
