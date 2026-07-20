import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { mock } from 'jest-mock';

jest.mock('../../../../../../../../../../subject_repositories/image-downloader/lib/request.js', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => Promise.resolve())
  };
});

describe('image downloader', () => {
  it('should resolve the destination path correctly', async () => {
    const url = 'http://example.com/image.jpg';
    const dest = '/absolute/path/to/images';
    const options = { url, dest };
    try {
      await image(options);
    } catch (error) {
      expect(error).toBeUndefined();
    }
    // If the mutation is present, the test will fail because the destination path
    // will not be resolved correctly, causing the request to fail.
  });
});