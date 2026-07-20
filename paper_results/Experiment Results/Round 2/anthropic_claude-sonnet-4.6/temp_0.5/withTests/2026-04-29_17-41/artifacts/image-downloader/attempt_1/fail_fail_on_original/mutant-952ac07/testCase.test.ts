import * as path from 'path';
import * as nock from 'nock';
import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';

const requestFn = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js');

describe('request error handling', () => {
  it('should reject the promise when the HTTP request emits an error event', async () => {
    // Set up nock to simulate a connection error (not a status code error)
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