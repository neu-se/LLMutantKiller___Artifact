import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should reject when destination path is not absolute', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    // Mock the request module to avoid actual network calls
    jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request', () => ({
      __esModule: true,
      default: jest.fn().mockRejectedValue(new Error('Network error'))
    }));

    await expect(image({ url: testUrl, dest: relativeDest }))
      .rejects
      .toThrow('The options.dest is required');

    // In original code, this should reject because path.isAbsolute(relativeDest) is false
    // In mutated code, this will not reject because of the "if (false)" condition
  });
});