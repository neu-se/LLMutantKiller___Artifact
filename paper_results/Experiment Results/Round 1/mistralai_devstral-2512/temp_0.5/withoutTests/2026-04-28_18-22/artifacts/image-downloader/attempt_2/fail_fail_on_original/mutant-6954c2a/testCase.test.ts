import { createWriteStream } from 'fs';
import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';
import nock from 'nock';

describe('request module error handling', () => {
  it('should reject with a properly formatted error message when status code is not 200', async () => {
    const testUrl = 'http://example.com/image.jpg';
    const testDest = './test-output.jpg';

    nock('http://example.com')
      .get('/image.jpg')
      .reply(404);

    try {
      await request({ url: testUrl, dest: testDest });
      fail('Expected request to reject');
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain('Request Failed.');
      expect(error.message).toContain('Status Code: 404');
    }
  });
});