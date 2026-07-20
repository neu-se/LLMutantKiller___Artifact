import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe('image function', () => {
  it('should reject with a specific error message when url is not provided', async () => {
    await expect(image({ dest: '/some/path' })).rejects.toThrow('The options.url is required');
  });
});