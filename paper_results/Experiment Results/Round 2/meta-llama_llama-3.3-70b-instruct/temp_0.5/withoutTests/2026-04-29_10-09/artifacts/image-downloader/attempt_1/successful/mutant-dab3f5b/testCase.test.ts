import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe('image downloader', () => {
  it('should reject with a meaningful error message when url is not provided', async () => {
    await expect(image({})).rejects.toThrowError('The options.url is required');
  });
});