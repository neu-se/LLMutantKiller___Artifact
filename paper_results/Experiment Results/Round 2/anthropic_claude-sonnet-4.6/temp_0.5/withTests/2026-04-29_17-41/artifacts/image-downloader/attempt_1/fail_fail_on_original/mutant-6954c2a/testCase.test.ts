import nock from 'nock';
import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';

describe('request error message on non-200 status', () => {
  it('should include "Request Failed." in the error message when status code is not 200', async () => {
    nock('http://example.com')
      .get('/image-404.jpg')
      .reply(404, 'Not Found');

    let caughtError: Error | null = null;

    try {
      await request({ url: 'http://example.com/image-404.jpg', dest: '/tmp/test-image.jpg' });
    } catch (err) {
      caughtError = err as Error;
    }

    expect(caughtError).not.toBeNull();
    expect(caughtError).toBeInstanceOf(Error);
    expect(caughtError!.message).toContain('Request Failed.');
    expect(caughtError!.message).toContain('Status Code: 404');
  });
});