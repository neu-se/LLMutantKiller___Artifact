import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should properly resolve relative paths to absolute paths', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';
    const expectedPath = path.resolve(__dirname, relativeDest, 'image.jpg');

    // Mock the request module to capture the final destination path
    const mockRequest = jest.fn((options) => {
      // In the original code, this should be an absolute path
      // In the mutated code, this will be a relative path due to the always-true condition
      return Promise.resolve({ dest: options.dest });
    });

    // Replace the request module
    jest.doMock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js', () => ({
      __esModule: true,
      default: mockRequest
    }));

    // Clear the module cache and re-import
    jest.resetModules();
    const { image: testImage } = await import("../../../../../../../../../../../subject_repositories/image-downloader/index.js");

    await testImage({ url: testUrl, dest: relativeDest });

    // Verify the path was converted to absolute
    const callOptions = mockRequest.mock.calls[0][0];
    expect(path.isAbsolute(callOptions.dest)).toBe(true);
    expect(callOptions.dest).toBe(expectedPath);
  });
});