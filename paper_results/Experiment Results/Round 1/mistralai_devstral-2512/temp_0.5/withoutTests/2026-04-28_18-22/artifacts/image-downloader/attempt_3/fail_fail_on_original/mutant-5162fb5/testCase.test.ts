import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should handle relative destination paths correctly', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Mock the request module to avoid actual network calls
    const request = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request');
    const originalRequest = request;
    request = jest.fn().mockResolvedValue({});

    try {
      await image({ url: testUrl, dest: relativeDest });
      // In original code, this should work because path.isAbsolute will be checked
      // In mutated code, this will fail because the path resolution won't happen
      const expectedPath = path.resolve(__dirname, relativeDest, 'image.jpg');
      expect(request).toHaveBeenCalledWith(
        expect.objectContaining({
          dest: expectedPath
        })
      );
    } finally {
      // Restore original request
      jest.restoreAllMocks();
    }
  });
});