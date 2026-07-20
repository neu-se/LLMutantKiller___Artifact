import { request } from "../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js";
import * as nock from 'nock';
import * as path from 'path';
import * as fs from 'fs';

describe('request module error handling', () => {
  it('should reject with status code in error message for non-200 responses', async () => {
    const testUrl = 'http://example.com/image.jpg';
    const testDest = path.join(__dirname, 'test-output.jpg');
    const scope = nock('http://example.com')
      .get('/image.jpg')
      .reply(404, 'Not Found');

    try {
      await request({ url: testUrl, dest: testDest });
      fail('Expected request to reject');
    } catch (error) {
      expect(error.message).toContain('Status Code: 404');
    }

    scope.done();
  });
});