const nock = require('nock');
const request = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js');

describe('request error message on non-200 status', () => {
  it('should reject with an error message containing "Request Failed." when status code is not 200', async () => {
    nock('http://testurl.com')
      .get('/image-not-found.jpg')
      .reply(404, 'Not Found');

    let caughtError: Error | null = null;

    try {
      await request({ url: 'http://testurl.com/image-not-found.jpg', dest: '/tmp/test.jpg' });
    } catch (err) {
      caughtError = err as Error;
    }

    expect(caughtError).not.toBeNull();
    expect(caughtError).toBeInstanceOf(Error);
    expect(caughtError!.message).toContain('Request Failed.');
    expect(caughtError!.message).toContain('Status Code: 404');
  });
});