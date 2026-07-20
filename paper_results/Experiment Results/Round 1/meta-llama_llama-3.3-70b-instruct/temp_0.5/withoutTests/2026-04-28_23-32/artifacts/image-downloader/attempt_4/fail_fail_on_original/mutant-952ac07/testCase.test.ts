import nock from 'nock';
import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';

describe('request function', () => {
  it('should handle request errors correctly', async () => {
    const url = 'http://example.com/non-existent-url';
    const dest = 'test.txt';

    nock('http://example.com')
      .get('/')
      .reply(200);

    // The original code should resolve with an object containing the filename
    // The mutated code should not resolve with an object containing the filename
    // Because the event listener is not correctly attached
    await expect(request({ url, dest })).resolves.toHaveProperty('filename', dest);
  });
});