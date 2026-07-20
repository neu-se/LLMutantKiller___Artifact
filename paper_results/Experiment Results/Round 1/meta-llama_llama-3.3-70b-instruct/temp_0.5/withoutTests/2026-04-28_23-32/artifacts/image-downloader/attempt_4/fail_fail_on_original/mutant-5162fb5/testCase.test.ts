import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';
import { join } from 'path';
import fs from 'fs';

describe('image downloader', () => {
  it('should resolve the destination path correctly', async () => {
    const url = 'http://example.com/image.jpg';
    const dest = './images';
    await image({ url, dest, extractFilename: false });
    expect(fs.existsSync(dest)).toBe(false);
    await image({ url, dest, extractFilename: true });
    expect(fs.existsSync(join(dest, 'image.jpg'))).toBe(false);
  });
});