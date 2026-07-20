import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';

describe('image downloader', () => {
  it('should reject with a meaningful error message when options.url is missing', () => {
    return expect(image({ dest: '/tmp' })).rejects.toThrowError('The options.url is required');
  });
});