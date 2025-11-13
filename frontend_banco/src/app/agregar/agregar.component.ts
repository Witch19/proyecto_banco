import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {

  productoForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    logo: new FormControl('', Validators.required),
    fechaLiberacion: new FormControl('', Validators.required),
    fechaRevision: new FormControl('', Validators.required)
  });

  productosService = inject(ProductosService);

  agregar() {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    console.log("Producto válido:", this.productoForm.value);
  }

  reiniciar() {
    this.productoForm.reset();
  }
}

function fechaRevisionValidator(control: FormControl) {
  if (!control.parent) return null;

  const fechaLiberacion = control.parent.get('fechaLiberacion')?.value;
  const fechaRevision = control.value;

  if (!fechaLiberacion || !fechaRevision) return null;

  const liberacion = new Date(fechaLiberacion);
  const revision = new Date(fechaRevision);

  liberacion.setFullYear(liberacion.getFullYear() + 1);

  return revision.getTime() === liberacion.getTime()
    ? null
    : { fechaIncorrecta: true };
}

