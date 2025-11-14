import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      console.error('❌ Error en API:', error);

      let mensaje = 'Error inesperado. Intente nuevamente.';

      if (error.status === 0) {
        mensaje = 'Sin conexión con el servidor.';
      } else if (error.status === 400) {
        mensaje = error.error?.message || 'Solicitud inválida.';
      } else if (error.status === 404) {
        mensaje = 'Recurso no encontrado.';
      } else if (error.status === 500) {
        mensaje = 'Error interno del servidor.';
      }

      return throwError(() => ({ status: error.status, message: mensaje }));
    })
  );
};
