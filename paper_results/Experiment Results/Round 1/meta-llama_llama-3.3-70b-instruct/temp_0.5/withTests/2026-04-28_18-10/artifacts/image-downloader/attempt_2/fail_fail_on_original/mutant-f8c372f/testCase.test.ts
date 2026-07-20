import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';

describe('download image', () => {
  it('should throw an error with a non-empty message when options.dest is missing', () => {
    expect(() => download.image({ url: 'http://someurl.com/image.jpg' })).rejects.toThrowError(expect.stringMatching(/.+$/));
  });
});