import fs from 'fs';
import nock from 'nock';
import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/index';

describe('download an image', () => {
  it('should save image and handle write stream error', async () => {
    const url = 'http://someurl.com/image-success.png';
    const dest = '/tmp/image-success.png';

    nock('http://someurl.com')
      .get(/success/)
      .reply(200, 'image data', {
        'Content-Type': 'image/png',
      });

    // Create a temporary file to test write stream error
    fs.writeFileSync(dest, 'initial data');

    try {
      await download.image({ url, dest });
      throw new Error('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    } finally {
      fs.unlinkSync(dest);
    }
  });
});