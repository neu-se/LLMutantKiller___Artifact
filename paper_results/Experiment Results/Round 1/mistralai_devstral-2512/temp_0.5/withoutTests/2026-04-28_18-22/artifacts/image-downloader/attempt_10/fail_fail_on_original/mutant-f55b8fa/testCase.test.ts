import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader path resolution', () => {
  it('should handle relative destination paths correctly', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Mock the request module
    jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request', () => ({
      __esModule: true,
      default: jest.fn().mockResolvedValue({})
    }));

    // Re-import the module to get the mocked version
    const { image: mockedImage } = await import("../../../../../../../../../../../subject_repositories/image-downloader/index.js");
    const request = await import('../../../../../../../../../../../subject_repositories/image-downloader/lib/request');

    await mockedImage({ url: testUrl, dest: relativeDest });

    // Get the first call arguments
    const callArgs = request.default.mock.calls[0][0];

    // Verify the path was resolved correctly
    expect(path.isAbsolute(callArgs.dest)).toBe(true);
    expect(callArgs.dest).toContain('downloads');
    expect(callArgs.dest).toContain('image.jpg');
  });
});