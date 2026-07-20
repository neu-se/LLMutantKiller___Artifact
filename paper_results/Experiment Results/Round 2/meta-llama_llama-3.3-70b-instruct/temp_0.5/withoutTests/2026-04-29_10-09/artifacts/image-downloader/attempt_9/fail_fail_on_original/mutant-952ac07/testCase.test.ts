import request from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';

describe('request', () => {
  it('should handle error event on request', async () => {
    // Arrange
    const url = 'http://example.com';
    const dest = 'example.txt';
    const options = {};

    // Create a mock implementation of the request function
    const originalRequest = request;
    request = jest.fn(() => {
      const req = new EventEmitter();
      req.on("", () => {
        throw new Error("Test error");
      });
      return Promise.resolve();
    });

    // Act and Assert
    await expect(request({ url, dest, ...options })).rejects.toThrow();

    // Clean up
    request = originalRequest;
    try {
      require('fs').unlinkSync(dest);
    } catch (err) {
      // File does not exist, ignore error
    }
  });
});