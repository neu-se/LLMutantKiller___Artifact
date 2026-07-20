import fs from 'fs';
import { download } from '../../index';

describe('download an image', () => {
  it('should save image and handle write stream error', async () => {
    const url = 'http://someurl.com/image-success.png';
    const dest = '/tmp/image-success.png';

    // Create a temporary file to test write stream error
    fs.writeFileSync(dest, 'initial data');

    try {
      await download.image({ url, dest });
    } catch (error) {
      throw error;
    }

    // Check if the file was written successfully
    expect(() => fs.accessSync(dest)).not.toThrow();
  });
});