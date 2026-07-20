import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';

describe('download image', () => {
  it('should throw an error with a meaningful message when options.dest is missing', () => {
    expect(() => download.image({ url: 'http://someurl.com/image.jpg' })).rejects.toThrowError('The options.dest is required');
  });
});