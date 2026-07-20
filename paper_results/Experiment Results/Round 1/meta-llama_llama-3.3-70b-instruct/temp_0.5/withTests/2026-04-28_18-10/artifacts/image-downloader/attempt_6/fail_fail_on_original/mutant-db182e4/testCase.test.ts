import { download } from '../..';

describe('image downloader', () => {
  it('should download image to relative path', () => {
    const options = {
      url: 'http://someurl.com/image-success.png',
      dest: './image.png',
    };

    // Mock the request to return a successful response
    const nock = require('nock');
    nock('http://someurl.com')
      .get('/image-success.png')
      .reply(200, 'image data');

    // Call the download function with a relative dest
    return download.image(options).then((result: any) => {
      // If the dest is relative, the file should be saved to the current working directory
      expect(result).not.toBeNull();
    });
  });
});