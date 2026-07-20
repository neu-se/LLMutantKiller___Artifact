import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader path resolution', () => {
  it('should convert relative destination path to absolute path', async () => {
    const relativeDest = 'downloads/test.jpg';

    // Mock the request module to capture the final options
    jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js', () => ({
      __esModule: true,
      default: jest.fn((options: any) => {
        return Promise.resolve({
          filename: options.dest
        });
      })
    }));

    const { default: mockRequest } = await import('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js');

    const result = await image({
      url: 'https://example.com/image.jpg',
      dest: relativeDest,
      extractFilename: false
    });

    const expectedAbsolutePath = path.resolve(__dirname, relativeDest);
    expect(result.filename).toBe(expectedAbsolutePath);
    expect(path.isAbsolute(result.filename)).toBe(true);
  });
});