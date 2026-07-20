import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should detect path resolution mutation', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Mock path.isAbsolute to return false (simulating relative path)
    const originalIsAbsolute = path.isAbsolute;
    path.isAbsolute = jest.fn().mockReturnValue(false);

    // Mock path.resolve to track if it's called
    const originalResolve = path.resolve;
    const resolveMock = jest.fn(originalResolve);
    path.resolve = resolveMock;

    try {
      // Mock the request to avoid network calls
      const request = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request');
      request.default = jest.fn().mockResolvedValue({});

      await image({ url: testUrl, dest: relativeDest });

      // In original code, path.resolve should be called because path.isAbsolute returns false
      // In mutated code, path.resolve won't be called because of the "if (false)" condition
      expect(resolveMock).toHaveBeenCalled();
    } finally {
      path.isAbsolute = originalIsAbsolute;
      path.resolve = originalResolve;
    }
  });
});