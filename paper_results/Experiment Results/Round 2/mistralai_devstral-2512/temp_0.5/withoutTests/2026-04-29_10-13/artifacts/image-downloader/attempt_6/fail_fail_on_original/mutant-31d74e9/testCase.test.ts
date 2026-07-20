import request from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';
import fs from 'fs';
import path from 'path';

describe('request', () => {
  it('should properly handle stream error events during download', async () => {
    const testUrl = 'http://example.com/image.jpg';
    const invalidDest = path.join('/nonexistent/directory', 'test-download.jpg');

    let errorOccurred = false;
    let errorMessage = '';

    try {
      await request({ url: testUrl, dest: invalidDest });
    } catch (error: any) {
      errorOccurred = true;
      errorMessage = error.message;
    }

    expect(errorOccurred).toBe(true);
    expect(errorMessage).toContain('ENOENT');
  });
});