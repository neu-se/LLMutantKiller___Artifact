import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should handle path resolution correctly', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Mock the request module to verify the final destination path
    const mockRequest = jest.fn((options) => {
      // In the original code, options.dest should be absolute
      // In the mutated code, it will remain relative due to the always-true condition
      if (!path.isAbsolute(options.dest)) {
        throw new Error(`Expected absolute path but got: ${options.dest}`);
      }
      return Promise.resolve();
    });

    // Replace the request module
    jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js', () => ({
      __esModule: true,
      default: mockRequest
    }));

    // Clear the module cache and re-import
    jest.resetModules();
    const { image: testImage } = await import("../../../../../../../../../../../subject_repositories/image-downloader/index.js");

    await expect(testImage({ url: testUrl, dest: relativeDest })).resolves.not.toThrow();
    expect(mockRequest).toHaveBeenCalled();

    // Verify the path was converted to absolute
    const callOptions = mockRequest.mock.calls[0][0];
    expect(path.isAbsolute(callOptions.dest)).toBe(true);
  });
});