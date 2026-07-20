import { image } from '../../../index.js';
import { join } from 'path';

describe('image downloader', () => {
  it('should resolve the destination path correctly', async () => {
    const url = 'http://example.com/image.jpg';
    const dest = 'images';
    const expectedDest = join(__dirname, 'images', 'image.jpg');

    const result = await image({ url, dest });
    expect(result).resolves.not.toThrow();

    // Check if the destination path is resolved correctly
    const actualDest = result.then((response) => response.dest);
    expect(actualDest).resolves.toBe(expectedDest);
  });
});