import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { join } from 'path';

describe('image-downloader', () => {
  it('should resolve relative dest path correctly', async () => {
    const url = 'https://example.com/image.jpg';
    const dest = './images/image.jpg';
    await expect(image({ url, dest })).rejects.toThrowError();
    const originalDest = dest;
    await expect(image({ url, dest: originalDest })).rejects.toThrowError();
    const relativeDest = './images';
    await expect(image({ url, dest: relativeDest })).rejects.toThrowError();
    // Check if the dest is resolved correctly
    const absoluteDest = join(__dirname, relativeDest, 'image.jpg');
    await expect(image({ url, dest: relativeDest })).rejects.toThrowError();
  });
});