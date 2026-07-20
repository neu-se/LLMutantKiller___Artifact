import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe('options validation', () => {
  it('should reject with a specific error message when options.dest is missing', async () => {
    const promise = image({ url: 'http://example.com/image.jpg', dest: null });
    await expect(promise).rejects.toThrow('The options.dest is required');
  });
});