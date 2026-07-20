import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should verify path resolution behavior for relative destinations', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Create a spy on path.resolve to track calls
    const resolveSpy = jest.spyOn(path, 'resolve').mockImplementation((...args) => {
      // Return a predictable absolute path for testing
      return path.join('/absolute', ...args.slice(1));
    });

    try {
      // Mock the request to avoid network calls
      jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request', () => ({
        __esModule: true,
        default: jest.fn().mockResolvedValue({})
      }));

      await image({ url: testUrl, dest: relativeDest });

      // In original code, path.resolve should be called because path.isAbsolute(relativeDest) is false
      // In mutated code, path.resolve won't be called because of the "if (false)" condition
      expect(resolveSpy).toHaveBeenCalledWith(expect.any(String), relativeDest, 'image.jpg');
    } finally {
      resolveSpy.mockRestore();
      jest.unmock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request');
    }
  });
});