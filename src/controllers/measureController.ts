import { Request, Response } from 'express';
import MeasureService from '../services/measureService';
import FileStorage from '../utils/FileStorage';
import ImageProcessor from '../utils/ImageProcessor';
import { MeasureError } from '../errors';
import path from 'path';

const fileStorage = new FileStorage(path.join(__dirname, '..', 'assets'));
const imageProcessor = new ImageProcessor();
const measureService = new MeasureService(fileStorage, imageProcessor);

export const uploadMeasure = async (req: Request, res: Response) => {
  try {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    // Validate 'image'
    if (!image || typeof image !== 'string') {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Invalid Base64 image',
      });
    }

    // Validate 'customer_code'
    if (!customer_code || typeof customer_code !== 'string') {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Invalid customer code',
      });
    }

    // Validate 'measure_datetime'
    if (!measure_datetime || isNaN(Date.parse(measure_datetime))) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Invalid measure datetime',
      });
    }

    // Validate 'measure_type'
    if (!measure_type || !['WATER', 'GAS'].includes(measure_type.toUpperCase())) {
      return res.status(400).json({
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitida',
      });
    }

    // Call the service method to handle the upload
    const result = await measureService.uploadMeasure({
      image,
      customer_code,
      measure_datetime: new Date(measure_datetime),
      measure_type: measure_type.toUpperCase() as 'WATER' | 'GAS',
    });

    res.status(200).json(result);
  } catch (error: any) {
    console.error(error);

    if (error instanceof MeasureError) {
      return res.status(error.statusCode).json({
        error_code: error.code,
        error_description: error.message,
      });
    }

    res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: 'An unexpected error occurred',
    });
  }
};

export const confirmMeasure = async (req: Request, res: Response) => {
  try {
    const { measure_uuid, confirmed_value } = req.body;

    await measureService.confirmMeasure({ measure_uuid, confirmed_value });

    // Validate 'measure_uuid'
    if (!measure_uuid || typeof measure_uuid !== 'string') {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Invalid measure_uuid',
      });
    }

    // Validate 'confirmed_value'
    if (typeof confirmed_value !== 'number' || isNaN(confirmed_value)) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Invalid confirmed_value',
      });
    }

    res.status(200).json({ message: 'Measure confirmed successfully' });
  } catch (error: any) {
    console.error(error);

    if (error instanceof MeasureError) {
      return res.status(error.statusCode).json({
        error_code: error.code,
        error_description: error.message,
      });
    }

    res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: 'An unexpected error occurred',
    });
  }
};

export const listMeasures = async (req: Request, res: Response) => {
  try {
    const { customerCode } = req.params; // Extracting customerCode from route params
    const { measureType } = req.query; // Extracting measureType from query params

    if (!customerCode) {
      return res.status(400).json({
        error_code: 'MISSING_CUSTOMER_CODE',
        error_description: 'Customer code is required',
      });
    }

    const measures = await measureService.listMeasures(customerCode, measureType as string);

    res.status(200).json(measures);
  } catch (error: any) {
    console.error(error);

    if (error.statusCode && error.code === 'INVALID_TYPE') {
      return res.status(error.statusCode).json({
        error_code: error.code,
        error_description: error.message,
      });
    }

    if (error instanceof MeasureError) {
      return res.status(error.statusCode).json({
        error_code: error.code,
        error_description: error.message,
      });
    }

    res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: 'An unexpected error occurred',
    });
  }
};

export default {
  uploadMeasure,
  confirmMeasure,
  listMeasures,
};

