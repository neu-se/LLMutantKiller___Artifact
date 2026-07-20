import nock from 'nock';
import * as path from 'path';
import * as os from 'os';

const requestModule = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js');

describe('request - non-200 status code error message', () => {
  it('should include "Request Failed." in the error message when status code is not 200', async () => {
    const baseUrl = 'http://example.com';
    const urlPath = '/image.jpg';
    const dest = path.join(os.tmpdir(), 'test-image.jpg');

    nock(baseUrl)
      .get(urlPath)
      .reply(404, 'Not Found');

    let caughtError: Error | null = null;

    try {
      await requestModule({ url: `${baseUrl}${urlPath}`, dest });
    } catch (err) {
      caughtError = err as Error;
    }

    expect(caughtError).not.toBeNull();
    expect(caughtError!.message).toContain('Request Failed.');
    expect(caughtError!.message).toContain('Status Code: 404');
  });
});