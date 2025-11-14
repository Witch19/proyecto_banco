import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  productosService = inject(ProductosService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  // 🔹 Inicializamos el formulario de una vez
  productoForm = new FormGroup({
    id: new FormControl('', []), // sin validadores, lo mostramos deshabilitado en HTML
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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.obtenerProducto(id);
  }

  obtenerProducto(id: string) {
    this.productosService.getProducto(id).subscribe({
      next: (producto: Producto) => {
        // 🔹 Rellenamos el formulario con los datos del backend
        this.productoForm.patchValue({
          id: producto.id,
          name: producto.name,
          description: producto.description,
          logo: producto.logo,
          date_release: producto.date_release,
          date_revision: producto.date_revision
        });
      },
      error: (err) => {
  console.error("Error al cargar producto", err);
  alert("Error al cargar producto");
}

    });
  }

  guardar() {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    // 🔹 getRawValue() devuelve también los campos deshabilitados (como id)
    const productoEditado = this.productoForm.getRawValue() as Producto;

    console.log("Producto editado a enviar:", productoEditado);

    this.productosService.actualizarProducto(productoEditado).subscribe({
      next: (resp) => {
        console.log("Producto actualizado", resp);
        alert("Producto actualizado correctamente");
        this.router.navigate(['/']); // volver al listado
      },
      error: (err) => {
        console.error("Error al actualizar producto", err);
        alert("Error al actualizar producto");
      }
    });
  }
}


// 🔥 Mismo validador de F4 / Agregar
export const fechaRevisionValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.parent) return null;

  const fechaLiberacion = control.parent.get('date_release')?.value;
  const fechaRevision = control.value;

  if (!fechaLiberacion || !fechaRevision) return null;

  const liberacion = new Date(fechaLiberacion);
  const revision = new Date(fechaRevision);

  liberacion.setFullYear(liberacion.getFullYear() + 1);

  return revision.getTime() === liberacion.getTime()
    ? null
    : { fechaIncorrecta: true };
};
