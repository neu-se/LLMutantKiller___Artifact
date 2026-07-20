import * as path from 'path';
import nock from 'nock';
import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';

// Set up nock to simulate a connection error (not a 404, but a socket/network error)
nock('http://error-test.com')
  .get('/network-error.jpg')
  .replyWithError('ECONNREFUSED: Connection refused');

describe('request error handling', () => {
  it('should reject the promise when the HTTP request emits an error event', async () => {
    await expect(
      request({
        url: 'http://error-test.com/network-error.jpg',
        dest: '/tmp/network-error-test.jpg',
      })
    ).rejects.toThrow();
  });
});