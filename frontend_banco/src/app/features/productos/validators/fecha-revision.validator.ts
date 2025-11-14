import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Valida que date_revision sea exactamente
 * 1 año después de date_release.
 */
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

  const esMismaFecha =
    revision.getFullYear() === liberacion.getFullYear() &&
    revision.getMonth() === liberacion.getMonth() &&
    revision.getDate() === liberacion.getDate();

  return esMismaFecha ? null : { fechaIncorrecta: true };
};
