import request from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';
import fs from 'fs';
import path from 'path';

describe('request', () => {
  it('should handle stream errors during download', async () => {
    const testUrl = 'http://example.com/image.jpg';
    const invalidDest = path.join('/nonexistent/directory', 'test-download.jpg');

    let errorOccurred = false;

    try {
      await request({ url: testUrl, dest: invalidDest });
    } catch (error) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBe(true);
  });
});