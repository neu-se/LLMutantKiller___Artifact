import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader path resolution', () => {
  it('should handle relative destination paths correctly', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Mock the request module to avoid actual network calls
    const request = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request');
    const originalRequest = request;
    request = jest.fn().mockResolvedValue({});

    try {
      await image({ url: testUrl, dest: relativeDest });
      const callArgs = request.mock.calls[0][0];
      expect(path.isAbsolute(callArgs.dest)).toBe(true);
      expect(callArgs.dest).toContain('downloads');
      expect(callArgs.dest).toContain('image.jpg');
    } finally {
      // Restore original request
      require.cache[require.resolve('../../../../../../../../../../../subject_repositories/image-downloader/lib/request')].exports = originalRequest;
    }
  });
});