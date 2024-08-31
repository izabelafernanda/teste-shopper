import prisma from '../config/database';
import { Measure } from '@prisma/client';
import FileStorage from '../utils/FileStorage';
import ImageProcessor from '../utils/ImageProcessor';
import { UploadMeasureRequest } from '../types/UploadMeasureRequest';
import { DoubleReportError, MeasureNotFoundError, ConfirmationDuplicateError } from '../errors';

class MeasureService {
  private fileStorage: FileStorage;
  private imageProcessor: ImageProcessor;

  constructor(fileStorage: FileStorage, imageProcessor: ImageProcessor) {
    this.fileStorage = fileStorage;
    this.imageProcessor = imageProcessor;
  }

  async uploadMeasure(data: UploadMeasureRequest): Promise<{ image_url: string; measure_value: number; measure_uuid: string }> {
    const { image, customer_code, measure_datetime, measure_type } = data;

    if (!image) {
      throw new Error('A imagem não foi fornecida ou está vazia.');
    }

    // Check for duplicate measure in the current month
    const existingMeasure = await prisma.measure.findFirst({
      where: {
        customerCode: customer_code,
        measureType: measure_type,
        measureDatetime: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Start of current month
        },
      },
    });

    if (existingMeasure) {
      throw new DoubleReportError();
    }

    // Save image and extract measure value
    const imageUrl = await this.fileStorage.saveImage(image);
    const measureValue = await this.imageProcessor.extractMeasureValue(image);

    // Store measure in the database
    const newMeasure = await prisma.measure.create({
      data: {
        customerCode: customer_code,
        measureDatetime: measure_datetime,
        measureType: measure_type,
        imageUrl: `/assets/${imageUrl}`,
        measureValue,
      },
    });

    return {
      image_url: newMeasure.imageUrl,
      measure_value: newMeasure.measureValue!,
      measure_uuid: newMeasure.id,
    };
  }

  async confirmMeasure(data: { measure_uuid: string; confirmed_value: number }): Promise<void> {
    const existingMeasure = await prisma.measure.findUnique({
      where: { id: data.measure_uuid },
    });

    if (!existingMeasure) {
      throw new MeasureNotFoundError();
    }

    if (existingMeasure.hasConfirmed) {
      throw new ConfirmationDuplicateError();
    }

    await prisma.measure.update({
      where: { id: data.measure_uuid },
      data: { measureValue: data.confirmed_value, hasConfirmed: true },
    });
  }

  async listMeasures(customerCode: string | undefined, measureType?: string): Promise<Measure[]> {
    if (!customerCode) {
      throw new Error('Customer code is required');
    }
  
    const normalizedCustomerCode = customerCode.trim(); // Ensure no leading or trailing spaces
  
    // Validate measureType
    if (measureType && !['WATER', 'GAS'].includes(measureType.toUpperCase())) {
      throw {
        statusCode: 400,
        code: 'INVALID_TYPE',
        message: 'Tipo de medição não permitida',
      };
    }
  
    const normalizedMeasureType = measureType?.toUpperCase(); // Normalize measureType
  
    const whereClause: any = {
      customerCode: normalizedCustomerCode,
    };
  
    if (normalizedMeasureType) {
      whereClause.measureType = normalizedMeasureType;
    }
  
    const measures = await prisma.measure.findMany({
      where: whereClause,
    });
  
    if (measures.length === 0) {
      throw new MeasureNotFoundError();
    }
  
    return measures;
  }
}

export default MeasureService;