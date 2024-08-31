import { MeasureError } from './MeasureError';

export class DoubleReportError extends MeasureError {
  constructor() {
    super('Leitura do mês já realizada', 409, 'DOUBLE_REPORT');
  }
}