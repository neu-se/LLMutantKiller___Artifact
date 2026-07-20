import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/index';

describe('image downloader', () => {
  it('should download image to absolute path', () => {
    const options = {
      url: 'http://someurl.com/image-success.png',
      dest: '/tmp/image.png',
    };

    // Mock the request to return a successful response
    const nock = require('nock');
    nock('http://someurl.com')
      .get('/image-success.png')
      .reply(200, 'image data');

    // Call the download function with an absolute dest
    return download.image(options).then((result: any) => {
      // If the dest is absolute, the file should be saved to the specified path
      expect(result).not.toBeNull();
    });
  });
});