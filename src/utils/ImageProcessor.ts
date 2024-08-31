import { generateImageContent } from '../services/geminiService';

class ImageProcessor {
  async extractMeasureValue(base64Image: string, fileType: string = 'png'): Promise<number> {
    const extractedText = await generateImageContent(base64Image, `image/${fileType}`);
    const measureValue = parseInt(extractedText.replace(/\D/g, ''), 10);

    if (isNaN(measureValue)) {
      throw new Error('Não foi possível extrair um valor válido do medidor. Por favor, verifique a imagem enviada.');
    }

    return measureValue;
  }
}

export default ImageProcessor;
