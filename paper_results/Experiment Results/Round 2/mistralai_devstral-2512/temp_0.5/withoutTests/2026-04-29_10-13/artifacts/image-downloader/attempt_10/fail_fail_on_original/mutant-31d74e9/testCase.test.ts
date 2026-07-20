import request from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';
import fs from 'fs';
import path from 'path';

describe('request', () => {
  it('should properly handle stream error events', async () => {
    const testUrl = 'http://example.com/image.jpg';
    const invalidDest = path.join('/nonexistent/directory', 'test-download.jpg');

    let errorOccurred = false;
    let isStreamError = false;

    try {
      await request({ url: testUrl, dest: invalidDest });
    } catch (error: any) {
      errorOccurred = true;
      isStreamError = error.message.includes('ENOENT') || error.message.includes('no such file or directory');
    }

    expect(errorOccurred).toBe(true);
    expect(isStreamError).toBe(true);
  });
});