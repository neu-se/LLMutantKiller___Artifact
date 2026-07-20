import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';
import { join } from 'path';
import fs from 'fs';

describe('image downloader', () => {
  it('should resolve the destination path correctly', async () => {
    const url = 'http://example.com/image.jpg';
    const dest = './test';
    await image({ url, dest, extractFilename: true });
    const expectedDest = join(process.cwd(), 'test');
    expect(fs.existsSync(expectedDest)).toBe(true);
    const files = fs.readdirSync(expectedDest);
    expect(files.length).toBeGreaterThan(0);
  });
});