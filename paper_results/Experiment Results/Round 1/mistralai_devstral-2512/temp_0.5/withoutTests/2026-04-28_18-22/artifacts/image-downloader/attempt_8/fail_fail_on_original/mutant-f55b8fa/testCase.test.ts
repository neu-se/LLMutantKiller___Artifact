import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader path resolution', () => {
  it('should handle relative destination paths correctly', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Mock the request module
    const requestModule = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request');
    const originalRequest = requestModule.default;
    requestModule.default = jest.fn().mockImplementation((options: any) => {
      // Verify the path was resolved correctly
      expect(path.isAbsolute(options.dest)).toBe(true);
      expect(options.dest).toContain('downloads');
      expect(options.dest).toContain('image.jpg');
      return Promise.resolve();
    });

    try {
      await expect(image({ url: testUrl, dest: relativeDest })).resolves.not.toThrow();
    } finally {
      // Restore the original implementation
      requestModule.default = originalRequest;
    }
  });
});