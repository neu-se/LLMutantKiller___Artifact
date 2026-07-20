import * as fs from 'fs';
import * as path from 'path';
import request from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';

describe('request module error handling', () => {
  it('should handle request errors properly', async () => {
    const testUrl = 'http://invalid.example.com/image.jpg';
    const dest = path.join(__dirname, 'test-image.jpg');

    let error: Error | undefined;
    try {
      await request({ url: testUrl, dest });
    } catch (err) {
      error = err as Error;
    }

    expect(error).toBeDefined();
    expect(error?.message).toContain('getaddrinfo ENOTFOUND');

    // Clean up
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest);
    }
  });
});