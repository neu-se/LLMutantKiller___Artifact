import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';
import nock from 'nock';
import fs from 'fs';
import path from 'path';

describe('request', () => {
  it('should handle pipe errors during download', async () => {
    const testUrl = 'http://example.com/image.jpg';
    const dest = path.join(__dirname, 'test-download.jpg');

    // Mock a successful response that will trigger a pipe error
    nock('http://example.com')
      .get('/image.jpg')
      .reply(200, 'test data');

    // Force a pipe error by using an invalid destination
    const invalidDest = path.join('/invalid/path', 'test-download.jpg');

    await expect(request({ url: testUrl, dest: invalidDest }))
      .rejects
      .toBeInstanceOf(Error);

    // Clean up if file was created
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest);
    }
  });
});