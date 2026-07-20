import request from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';

describe('request', () => {
  it('should reject the promise when an error occurs during the request', async () => {
    // Arrange
    const url = 'http://example.com';
    const dest = 'example.txt';
    const options = {};

    // Act and Assert
    await expect(request({ url, dest, ...options })).rejects.toThrow();

    // Clean up
    try {
      require('fs').unlinkSync(dest);
    } catch (err) {
      // File does not exist, ignore error
    }
  });
});