import { createWriteStream } from 'fs';
import { request } from './lib/request';
import * as nock from 'nock';
import * as path from 'path';

describe('request', () => {
  it('should reject with a descriptive error message for non-200 status codes', async () => {
    const testUrl = 'http://example.com/image.jpg';
    const testDest = path.join(__dirname, 'test-output.jpg');
    const scope = nock('http://example.com')
      .get('/image.jpg')
      .reply(404, 'Not Found');

    await expect(request({ url: testUrl, dest: testDest })).rejects.toThrowError(
      /Status Code: 404/
    );

    scope.done();
  });
});