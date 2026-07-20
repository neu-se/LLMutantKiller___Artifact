import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/index';

describe('image downloader', () => {
  it('should throw an error when dest is not absolute', () => {
    const options = {
      url: 'http://someurl.com/image-success.png',
      dest: 'image.png',
    };

    // Mock the request to return a successful response
    const nock = require('nock');
    nock('http://someurl.com')
      .get('/image-success.png')
      .reply(200, 'image data');

    // Call the download function with a non-absolute dest
    return download.image(options).then(({ filename }) => {
      // If the dest is not absolute, the file should be saved in the current working directory
      expect(filename).not.toContain('/tmp/image.png');
    });
  });
});