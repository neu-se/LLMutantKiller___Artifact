import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should verify path resolution is called for relative paths', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Mock path.isAbsolute to return false
    const originalIsAbsolute = path.isAbsolute;
    path.isAbsolute = jest.fn().mockReturnValue(false);

    // Mock path.resolve to track calls
    const resolveSpy = jest.spyOn(path, 'resolve');

    try {
      // Mock the request module to avoid network calls
      jest.doMock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request', () => ({
        __esModule: true,
        default: jest.fn().mockResolvedValue({})
      }));

      await image({ url: testUrl, dest: relativeDest });

      // In original code, path.resolve should be called because path.isAbsolute returns false
      // In mutated code, path.resolve won't be called because of the "if (false)" condition
      expect(resolveSpy).toHaveBeenCalled();
    } finally {
      path.isAbsolute = originalIsAbsolute;
      resolveSpy.mockRestore();
      jest.unmock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request');
    }
  });
});