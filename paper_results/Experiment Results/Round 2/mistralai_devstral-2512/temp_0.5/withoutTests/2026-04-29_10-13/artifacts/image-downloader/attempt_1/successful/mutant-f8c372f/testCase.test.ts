import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe('image downloader error handling', () => {
  it('should reject with specific error message when dest is missing', async () => {
    const promise = image({ url: 'http://example.com/image.jpg' });
    await expect(promise).rejects.toThrow('The options.dest is required');
  });
});