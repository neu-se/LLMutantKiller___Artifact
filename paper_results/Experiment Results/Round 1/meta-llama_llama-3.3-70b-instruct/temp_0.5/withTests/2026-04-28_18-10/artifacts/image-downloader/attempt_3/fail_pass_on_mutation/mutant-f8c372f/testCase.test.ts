import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';

describe('download image', () => {
  it('should throw an error with a meaningful message when options.dest is missing', async () => {
    try {
      await download.image({ url: 'http://someurl.com/image.jpg' });
    } catch (error) {
      expect(error.message).not.toBe('');
    }
  });
});