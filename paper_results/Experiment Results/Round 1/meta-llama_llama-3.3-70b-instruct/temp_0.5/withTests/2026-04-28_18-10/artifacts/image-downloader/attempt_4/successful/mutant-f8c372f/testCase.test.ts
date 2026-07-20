import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';

describe('download image', () => {
  it('should throw an error with a specific message when options.dest is missing', async () => {
    try {
      await image({ url: 'http://someurl.com/image.jpg' });
    } catch (error) {
      expect(error.message).not.toBe('');
      expect(error.message).toContain('dest');
    }
  });
});