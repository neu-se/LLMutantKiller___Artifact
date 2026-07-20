import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';
import { join } from 'path';
import fs from 'fs';

describe('image downloader', () => {
  it('should resolve the destination path correctly', async () => {
    const url = 'http://example.com/image.jpg';
    const dest = './images';
    await expect(image({ url, dest, extractFilename: false })).rejects.toThrowError('The options.dest is required');
    await expect(image({ url, dest: './non-existent-path', extractFilename: false })).rejects.toThrowError('The options.dest is required');
  });
});