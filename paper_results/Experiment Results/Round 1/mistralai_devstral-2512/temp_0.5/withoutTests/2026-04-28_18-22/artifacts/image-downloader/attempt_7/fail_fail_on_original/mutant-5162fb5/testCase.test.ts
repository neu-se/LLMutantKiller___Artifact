import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should handle path resolution correctly for relative destinations', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Mock path.isAbsolute to return false (simulating relative path)
    const originalIsAbsolute = path.isAbsolute;
    path.isAbsolute = jest.fn().mockReturnValue(false);

    try {
      // Mock the request to avoid actual network calls
      const request = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request');
      const originalRequest = request;
      jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request', () => ({
        __esModule: true,
        default: jest.fn().mockResolvedValue({})
      }));

      await image({ url: testUrl, dest: relativeDest });

      // In original code, path.resolve should be called because path.isAbsolute returns false
      // In mutated code, path.resolve won't be called because of the "if (false)" condition
      expect(path.resolve).toHaveBeenCalled();
    } finally {
      path.isAbsolute = originalIsAbsolute;
      jest.unmock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request');
    }
  });
});