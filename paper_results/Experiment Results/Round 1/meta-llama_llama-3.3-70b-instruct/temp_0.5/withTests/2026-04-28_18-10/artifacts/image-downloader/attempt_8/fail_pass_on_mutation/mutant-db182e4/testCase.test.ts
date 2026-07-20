const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index').image;

describe('image downloader', () => {
  it('should resolve relative path correctly', () => {
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
    return download(options).then((result: any) => {
      // If the dest is relative, the file should not be saved to the root directory
      expect(result.filename).not.toMatch(/^\/image\.png$/);
    });
  });
});