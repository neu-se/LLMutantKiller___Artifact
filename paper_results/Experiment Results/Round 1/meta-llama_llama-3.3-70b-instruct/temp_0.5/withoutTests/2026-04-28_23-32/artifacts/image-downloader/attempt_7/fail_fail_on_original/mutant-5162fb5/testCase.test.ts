import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';
import { join } from 'path';
import fs from 'fs';

describe('image downloader', () => {
  it('should resolve the destination path correctly', async () => {
    const url = 'http://example.com/image.jpg';
    const dest = './test';
    await image({ url, dest });
    const expectedDest = join(process.cwd(), 'test', 'image.jpg');
    expect(fs.realpathSync(dest)).not.toBe(expectedDest);
  });
});