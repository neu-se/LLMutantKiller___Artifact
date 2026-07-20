import { createWriteStream } from 'fs';
import { TimeoutError } from '../../lib/TimeoutError';
import { http, https } from 'follow-redirects';
import nock from 'nock';

describe('request', () => {
  it('should reject with an error when the request emits an error event', async () => {
    const url = 'http://someurl.com/image-error.jpg';
    nock(url)
      .get(/error/)
      .times(100)
      .replyWithError('Mocked error');

    const request = require('../../lib/request');
    await expect(request({ url, dest: '/tmp' })).rejects.toThrowError();
  });
});