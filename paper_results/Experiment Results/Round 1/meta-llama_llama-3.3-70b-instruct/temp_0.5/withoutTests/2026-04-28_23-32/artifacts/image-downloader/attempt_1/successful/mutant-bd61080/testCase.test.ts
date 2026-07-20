import { createWriteStream } from 'fs';
import { join } from 'path';
import nock from 'nock';
import { TimeoutError } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/TimeoutError';
import { http, https } from 'follow-redirects';
import request from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';

describe('request', () => {
  it('should reject with a meaningful error message when the status code is not 200', async () => {
    const url = 'https://example.com';
    const dest = 'example.txt';
    const statusCode = 404;

    nock(url)
      .get('/')
      .reply(statusCode, 'Not Found');

    await expect(request({ url, dest })).rejects.toThrowError(`Status Code: ${statusCode}`);
  });
});