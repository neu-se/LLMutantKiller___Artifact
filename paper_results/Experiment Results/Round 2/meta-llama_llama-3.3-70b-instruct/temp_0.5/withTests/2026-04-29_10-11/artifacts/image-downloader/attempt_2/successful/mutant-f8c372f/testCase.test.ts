import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index';

describe('image downloader', () => {
  it('should reject with a meaningful error when options.dest is missing', () => {
    expect.assertions(1);
    return image({ url: 'http://someurl.com/image.jpg' })
      .catch((error: Error) => {
        expect(error.message).toBe('The options.dest is required');
      });
  });
});