import nock from 'nock';
import { join } from 'path';
import { tmpdir } from 'os';
import { createWriteStream, unlinkSync } from 'fs';
import { TimeoutError } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/TimeoutError';
import request from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';

describe('request', () => {
  it('should reject with a meaningful error message when the status code is not 200', async () => {
    const url = 'http://example.com';
    const dest = join(tmpdir(), 'test.txt');
    const scope = nock(url)
      .get('/')
      .reply(404, 'Not Found');

    await expect(request({ url, dest })).rejects.toThrowError('Request Failed.\nStatus Code: 404');
    scope.done();
    try {
      unlinkSync(dest);
    } catch (error) {
      // Ignore if file does not exist
    }
  });
});