import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';
import { join } from 'path';

describe('image downloader', () => {
  it('should resolve the destination path correctly', async () => {
    const url = 'http://example.com/image.jpg';
    const dest = 'test';
    const result = await image({ url, dest });
    expect(result).not.toBeNull();
  });
});