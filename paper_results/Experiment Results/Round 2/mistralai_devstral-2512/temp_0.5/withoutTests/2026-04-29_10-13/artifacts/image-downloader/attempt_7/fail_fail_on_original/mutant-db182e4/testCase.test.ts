import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should handle relative destination paths correctly', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Mock the request module to verify the final destination path
    jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js', () => {
      return {
        __esModule: true,
        default: jest.fn((options) => {
          // In the original code, options.dest should be absolute
          // In the mutated code, it will remain relative due to the always-true condition
          if (!path.isAbsolute(options.dest)) {
            throw new Error(`Expected absolute path but got: ${options.dest}`);
          }
          return Promise.resolve();
        })
      };
    });

    await expect(image({ url: testUrl, dest: relativeDest })).resolves.not.toThrow();
  });
});