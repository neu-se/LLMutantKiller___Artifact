const request = require("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js");
const nock = require('nock');
const path = require('path');
const fs = require('fs');

describe('request module error handling', () => {
  it('should reject with status code in error message for non-200 responses', async () => {
    const testUrl = 'http://example.com/image.jpg';
    const testDest = path.join(__dirname, 'test-output.jpg');
    const scope = nock('http://example.com')
      .get('/image.jpg')
      .reply(404, 'Not Found');

    try {
      await request({ url: testUrl, dest: testDest });
      throw new Error('Expected request to reject');
    } catch (error: any) {
      expect(error.message).toContain('Status Code: 404');
    }

    scope.done();
  });
});