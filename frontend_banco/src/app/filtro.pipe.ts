import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from './core/models/producto.model';

@Pipe({
  name: 'filtro',
  standalone: true
})
export class FiltroPipe implements PipeTransform {

  transform(lista: Producto[], texto: string): Producto[] {
    if (!texto) return lista;

    texto = texto.toLowerCase();

    return lista.filter(item =>
      item.name.toLowerCase().includes(texto) ||
      item.description.toLowerCase().includes(texto)
    );
  }

}
