import nock = require('nock');

const requestFn = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js');

describe('request error handling', () => {
  it('should reject the promise when the HTTP request emits an error event', async () => {
    // Set up nock to simulate a connection/network error on the request itself
    nock('http://error-test.example.com')
      .get('/image.jpg')
      .replyWithError('Connection refused');

    await expect(
      requestFn({
        url: 'http://error-test.example.com/image.jpg',
        dest: '/tmp/test-error-image.jpg',
      })
    ).rejects.toThrow();
  });
});