import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';
import * as nock from 'nock';
import * as path from 'path';
import * as os from 'os';

describe('request', () => {
  it('should reject with an error message containing "Request Failed." when status code is not 200', async () => {
    nock('http://example.com')
      .get('/image.jpg')
      .reply(404, 'Not Found');

    const dest = path.join(os.tmpdir(), 'test-image.jpg');

    let caughtError: Error | null = null;
    try {
      await request({ url: 'http://example.com/image.jpg', dest });
    } catch (err) {
      caughtError = err as Error;
    }

    expect(caughtError).not.toBeNull();
    expect(caughtError!.message).toContain('Request Failed.');
    expect(caughtError!.message).toContain('Status Code: 404');
  });
});