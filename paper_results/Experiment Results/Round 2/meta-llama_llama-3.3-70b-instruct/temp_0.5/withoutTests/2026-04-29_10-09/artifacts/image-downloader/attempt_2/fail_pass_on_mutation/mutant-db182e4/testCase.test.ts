import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { join } from 'path';

describe('image-downloader', () => {
  it('should resolve relative dest path correctly', async () => {
    const url = 'https://example.com/image.jpg';
    const dest = './images';
    await expect(image({ url, dest })).rejects.toThrowError();
    await expect(image({ url, dest: join(__dirname, dest) })).rejects.toThrowError();
  });
});