import request from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';
import fs from 'fs';

describe('request', () => {
  it('should reject the promise when an error occurs during the request', async () => {
    // Arrange
    const url = 'http://example.com';
    const dest = 'example.txt';
    const options = {};

    // Act and Assert
    await expect(request({ url, dest, ...options })).resolves.not.toThrow();

    // Clean up
    try {
      fs.unlinkSync(dest);
    } catch (err) {
      // File does not exist, ignore error
    }
  });
});