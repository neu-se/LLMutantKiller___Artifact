import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe('image function', () => {
  it('should reject with a specific error message when options.url is missing', async () => {
    await expect(image({ dest: '/some/destination' })).rejects.toThrow('The options.url is required');
  });
});