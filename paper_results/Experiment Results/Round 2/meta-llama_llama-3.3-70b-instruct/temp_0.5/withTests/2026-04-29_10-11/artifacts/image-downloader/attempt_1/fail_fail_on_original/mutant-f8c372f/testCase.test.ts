import { image } from '../../../index';

describe('image downloader', () => {
  it('should reject with a meaningful error when options.dest is missing', () => {
    expect.assertions(1);
    return image({ url: 'http://someurl.com/image.jpg' })
      .catch((error) => {
        expect(error.message).toBe('The options.dest is required');
      });
  });
});