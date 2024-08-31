import { MeasureError } from './MeasureError';

export class ConfirmationDuplicateError extends MeasureError {
  constructor() {
    super('Leitura do mês já realizada', 409, 'CONFIRMATION_DUPLICATE');
  }
}