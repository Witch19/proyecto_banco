import { FormControl, FormGroup } from '@angular/forms';
import { fechaRevisionValidator } from './fecha-revision.validator';

describe('fechaRevisionValidator', () => {

  it('es válido cuando fecha_revision es +1 año', () => {
    const form = new FormGroup({
      date_release: new FormControl('2024-01-01'),
      date_revision: new FormControl('2025-01-01')
    });

    const result = fechaRevisionValidator(form.get('date_revision')!);
    expect(result).toBeNull();
  });

  it('es inválido cuando NO es +1 año', () => {
    const form = new FormGroup({
      date_release: new FormControl('2024-01-01'),
      date_revision: new FormControl('2024-02-01')
    });

    const result = fechaRevisionValidator(form.get('date_revision')!);
    expect(result).toEqual({ fechaIncorrecta: true });
  });

});
