import { createWriteStream } from 'fs';
import { request } from './lib/request';
import nock from 'nock';

describe('request module error handling', () => {
  it('should reject with a properly formatted error message when status code is not 200', async () => {
    const testUrl = 'http://example.com/image.jpg';
    const testDest = './test-output.jpg';

    // Setup nock to intercept the HTTP request and return a 404 status
    nock('http://example.com')
      .get('/image.jpg')
      .reply(404);

    try {
      await request({ url: testUrl, dest: testDest });
      fail('Expected request to reject');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain('Request Failed.');
      expect(error.message).toContain('Status Code: 404');
    }
  });
});