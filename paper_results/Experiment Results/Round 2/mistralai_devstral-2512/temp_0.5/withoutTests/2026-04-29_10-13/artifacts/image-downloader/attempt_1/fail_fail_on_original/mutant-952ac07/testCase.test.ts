import * as fs from 'fs';
import * as path from 'path';
import * as nock from 'nock';
import request from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';

describe('request module error handling', () => {
  it('should handle request errors properly', async () => {
    const testUrl = 'http://example.com/image.jpg';
    const dest = path.join(__dirname, 'test-image.jpg');

    // Mock a failed request
    nock(testUrl)
      .get('/image.jpg')
      .replyWithError('Network error');

    let error: Error | undefined;
    try {
      await request({ url: testUrl, dest });
    } catch (err) {
      error = err as Error;
    }

    expect(error).toBeDefined();
    expect(error?.message).toBe('Network error');

    // Clean up
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest);
    }
  });
});