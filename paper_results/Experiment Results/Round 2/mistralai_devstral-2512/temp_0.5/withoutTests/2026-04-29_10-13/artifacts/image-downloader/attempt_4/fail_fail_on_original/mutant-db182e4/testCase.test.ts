import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should resolve relative paths to absolute paths', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Mock the request module to track the final destination path
    const requestModule = await import('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js');
    const originalRequest = requestModule.default;
    requestModule.default = jest.fn((options) => {
      // Verify the path was converted to absolute
      if (!path.isAbsolute(options.dest)) {
        throw new Error(`Expected absolute path but got: ${options.dest}`);
      }
      return Promise.resolve();
    });

    try {
      await image({ url: testUrl, dest: relativeDest });
      expect(requestModule.default).toHaveBeenCalled();
    } finally {
      requestModule.default = originalRequest;
    }
  });
});