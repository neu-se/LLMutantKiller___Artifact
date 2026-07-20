import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader path resolution', () => {
  it('should resolve relative paths to absolute paths', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Mock the request module to avoid actual network calls
    jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request', () => ({
      __esModule: true,
      default: jest.fn().mockImplementation((options) => {
        // Verify the path was resolved correctly
        const pathModule = require('path');
        expect(pathModule.isAbsolute(options.dest)).toBe(true);
        expect(options.dest).toContain('downloads');
        expect(options.dest).toContain('image.jpg');
        return Promise.resolve();
      })
    }));

    await expect(image({ url: testUrl, dest: relativeDest })).resolves.not.toThrow();
  });
});