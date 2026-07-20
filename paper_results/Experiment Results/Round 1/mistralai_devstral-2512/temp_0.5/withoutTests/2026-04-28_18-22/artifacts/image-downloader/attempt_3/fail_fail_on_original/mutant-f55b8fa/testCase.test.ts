import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader path resolution', () => {
  it('should resolve relative paths to absolute paths', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Mock the request module
    jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request', () => ({
      __esModule: true,
      default: jest.fn().mockResolvedValue({})
    }));

    const request = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request');

    await image({ url: testUrl, dest: relativeDest });

    const callArgs = request.default.mock.calls[0][0];
    expect(path.isAbsolute(callArgs.dest)).toBe(true);
    expect(callArgs.dest).toContain('downloads');
    expect(callArgs.dest).toContain('image.jpg');
  });
});