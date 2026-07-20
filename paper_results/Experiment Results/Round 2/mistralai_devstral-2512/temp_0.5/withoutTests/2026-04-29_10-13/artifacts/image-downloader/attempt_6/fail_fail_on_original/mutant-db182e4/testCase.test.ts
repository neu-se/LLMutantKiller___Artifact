import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should convert relative paths to absolute paths', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Mock the request function to verify the final destination path
    const mockRequest = jest.fn((options) => {
      // In the original code, options.dest should be absolute
      // In the mutated code, it will remain relative due to the always-true condition
      if (!path.isAbsolute(options.dest)) {
        throw new Error(`Expected absolute path but got: ${options.dest}`);
      }
      return Promise.resolve();
    });

    // Temporarily replace the request module
    jest.doMock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js', () => ({
      __esModule: true,
      default: mockRequest
    }));

    const { image } = await import("../../../../../../../../../../../subject_repositories/image-downloader/index.js");

    await expect(image({ url: testUrl, dest: relativeDest })).resolves.not.toThrow();
    expect(mockRequest).toHaveBeenCalled();
  });
});