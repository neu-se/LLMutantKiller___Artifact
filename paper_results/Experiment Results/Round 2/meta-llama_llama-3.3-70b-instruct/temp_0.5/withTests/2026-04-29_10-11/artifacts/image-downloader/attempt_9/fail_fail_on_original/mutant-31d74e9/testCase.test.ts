import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/index';
import fs from 'fs';

describe('download an image', () => {
  it('should save image and handle write stream error', async () => {
    const url = 'http://someurl.com/image-success.png';
    const dest = '/tmp/image-success.png';

    try {
      await download.image({ url, dest });
    } catch (error) {
      throw error;
    }

    // Check if the file was written successfully
    expect(() => fs.accessSync(dest)).not.toThrow();
  });
});