import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should handle relative destination paths correctly', async () => {
    const testUrl = 'https://example.com/image.png';
    const relativeDest = './downloads';
    const options = { url: testUrl, dest: relativeDest, extractFilename: true };

    const originalResolve = path.resolve;
    let resolveCalled = false;

    path.resolve = jest.fn((...args) => {
      if (args.length === 2 && args[1] === path.join(relativeDest, 'image.png')) {
        resolveCalled = true;
      }
      return originalResolve(...args);
    });

    await expect(image(options)).rejects.toThrow();
    expect(resolveCalled).toBe(true);

    path.resolve = originalResolve;
  });
});