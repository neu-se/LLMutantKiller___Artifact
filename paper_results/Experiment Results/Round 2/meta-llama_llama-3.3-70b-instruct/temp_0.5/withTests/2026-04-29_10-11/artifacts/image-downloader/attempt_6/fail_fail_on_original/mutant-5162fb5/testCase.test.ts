import { image } from '../../../index.js';
import * as path from 'path';
import * as fs from 'fs';

describe('image downloader', () => {
  it('should resolve the destination path correctly', async () => {
    const url = 'http://someurl.com/image-success.png';
    const dest = './image-success.png';

    const result = await image({ url, dest, extractFilename: false });
    expect(result.filename).toBe(path.join(process.cwd(), dest));
  });
});