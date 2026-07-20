import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader path resolution', () => {
  it('should handle relative destination paths correctly', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Mock the request module before importing
    jest.doMock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request', () => ({
      __esModule: true,
      default: jest.fn().mockImplementation((options) => {
        // Verify the path was resolved correctly
        expect(path.isAbsolute(options.dest)).toBe(true);
        expect(options.dest).toContain('downloads');
        expect(options.dest).toContain('image.jpg');
        return Promise.resolve();
      })
    }));

    // Re-import the module to get the mocked version
    const { image: mockedImage } = await import("../../../../../../../../../../../subject_repositories/image-downloader/index.js");

    await expect(mockedImage({ url: testUrl, dest: relativeDest })).resolves.not.toThrow();
  });
});