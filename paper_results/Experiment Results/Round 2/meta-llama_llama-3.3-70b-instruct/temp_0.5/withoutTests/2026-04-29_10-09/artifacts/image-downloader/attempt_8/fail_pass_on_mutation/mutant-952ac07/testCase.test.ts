import request from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';

describe('request', () => {
  it('should handle error event on request', async () => {
    // Arrange
    const url = 'http://example.com';
    const dest = 'example.txt';
    const options = {};

    // Act
    const promise = request({ url, dest, ...options });

    // Assert
    await expect(promise).resolves.not.toThrow();

    // Clean up
    try {
      require('fs').unlinkSync(dest);
    } catch (err) {
      // File does not exist, ignore error
    }
  });
});