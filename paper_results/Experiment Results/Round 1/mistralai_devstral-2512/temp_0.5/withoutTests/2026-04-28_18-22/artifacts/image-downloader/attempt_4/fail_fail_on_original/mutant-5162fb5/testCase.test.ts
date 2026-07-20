import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should resolve relative destination paths to absolute paths', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Spy on path.resolve to verify it's called with correct arguments
    const resolveSpy = jest.spyOn(path, 'resolve');

    try {
      await image({ url: testUrl, dest: relativeDest });
      // In original code, path.resolve should be called because path.isAbsolute(relativeDest) is false
      // In mutated code, path.resolve won't be called because of the "if (false)" condition
      expect(resolveSpy).toHaveBeenCalled();
    } finally {
      resolveSpy.mockRestore();
    }
  });
});