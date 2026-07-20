import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';
import { join } from 'path';
import fs from 'fs';

describe('image downloader', () => {
  it('should resolve the destination path correctly', async () => {
    const url = 'http://example.com/image.jpg';
    const dest = './images';
    const expectedDest = join(__dirname, 'images', 'image.jpg');

    await image({ url, dest });
    expect(fs.existsSync(expectedDest)).toBe(true);
  });
});