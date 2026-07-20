import request from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';
import fs from 'fs';
import path from 'path';

describe('request', () => {
  it('should properly handle stream errors during download', async () => {
    const testUrl = 'http://example.com/image.jpg';
    const dest = path.join(__dirname, 'test-download.jpg');

    // Create a write stream that will fail
    const testDir = path.join(__dirname, 'nonexistent-dir');
    const invalidDest = path.join(testDir, 'test-download.jpg');

    let streamError = false;
    try {
      await request({ url: testUrl, dest: invalidDest });
    } catch (error) {
      streamError = true;
      expect(error.message).toContain('ENOENT');
    }

    expect(streamError).toBe(true);
  });
});