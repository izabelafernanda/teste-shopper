import { MeasureError } from './MeasureError';

export class MeasureNotFoundError extends MeasureError {
  constructor() {
    super('Leitura não encontrada', 404, 'MEASURE_NOT_FOUND');
  }
}