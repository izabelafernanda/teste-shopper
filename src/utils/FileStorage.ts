import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

class FileStorage {
  private baseDir: string;

  constructor(baseDir: string) {
    this.baseDir = baseDir;
  }

  async saveImage(base64Image: string, subDir: string = 'images'): Promise<string> {
    const fileType = 'png';
    const fileName = `${uuidv4()}.${fileType}`;
    const dirPath = join(this.baseDir, subDir);
    const filePath = join(dirPath, fileName);

    // Ensure directory exists
    await mkdir(dirPath, { recursive: true });

    // Convert base64 image to buffer and save
    const imageBuffer = Buffer.from(base64Image, 'base64');
    await writeFile(filePath, imageBuffer);

    return join(subDir, fileName);
  }
}

export default FileStorage;
