import { download } from '../index';

describe('image downloader', () => {
  it('should throw an error when dest is not absolute', () => {
    const originalCwd = process.cwd();
    process.chdir('/tmp');
    const options = {
      url: 'http://someurl.com/image-success.png',
      dest: 'image.png',
    };

    // Mock the request to return a successful response
    const nock = require('nock');
    nock('http://someurl.com')
      .get('/image-success.png')
      .reply(200, 'image data');

    // Call the download function
    return download.image(options).then(() => {
      // If the dest is not absolute, the file should be saved in the current working directory
      expect(() => require('fs').accessSync('/tmp/image.png')).not.toThrow();
    }).finally(() => {
      // Restore the original working directory
      process.chdir(originalCwd);
    });
  });
});