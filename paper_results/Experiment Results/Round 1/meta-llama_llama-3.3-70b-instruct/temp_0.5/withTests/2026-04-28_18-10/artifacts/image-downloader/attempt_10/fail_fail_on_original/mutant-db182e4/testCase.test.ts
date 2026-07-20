const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index').image;
const path = require('path');
const fs = require('fs');

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
      // If the dest is relative, the file should be saved to the current working directory
      const filename = path.join(process.cwd(), 'image.png');
      // Check if the file exists before and after the download
      const existsBefore = fs.existsSync(filename);
      return new Promise((resolve) => {
        setTimeout(() => {
          const existsAfter = fs.existsSync(filename);
          expect(existsAfter).toBe(true);
          expect(existsAfter).not.toBe(existsBefore);
          resolve();
        }, 100);
      });
    });
  });
});