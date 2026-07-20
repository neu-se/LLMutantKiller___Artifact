import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe('image downloader error handling', () => {
  it('should reject with a specific error message when url is missing', async () => {
    try {
      await image({ url: undefined, dest: '/tmp' });
      throw new Error('Expected promise to reject');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('The options.url is required');
    }
  });
});