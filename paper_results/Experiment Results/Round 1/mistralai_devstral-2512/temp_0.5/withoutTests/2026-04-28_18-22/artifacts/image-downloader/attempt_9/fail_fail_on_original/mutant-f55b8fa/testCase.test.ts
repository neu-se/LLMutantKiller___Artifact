import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader path resolution', () => {
  it('should handle relative destination paths correctly', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Mock the request module
    const requestModule = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request');
    const originalRequest = requestModule.default;
    requestModule.default = jest.fn().mockResolvedValue({});

    try {
      await image({ url: testUrl, dest: relativeDest });

      // Get the first call arguments
      const callArgs = requestModule.default.mock.calls[0][0];

      // Verify the path was resolved correctly
      expect(path.isAbsolute(callArgs.dest)).toBe(true);
      expect(callArgs.dest).toContain('downloads');
      expect(callArgs.dest).toContain('image.jpg');
    } finally {
      // Restore the original implementation
      requestModule.default = originalRequest;
    }
  });
});