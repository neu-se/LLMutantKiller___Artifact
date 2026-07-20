const request = require("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js");
const fs = require('fs');
const path = require('path');
const nock = require('nock');

describe('request error handling', () => {
  it('should reject with an error when the request fails', async () => {
    const testUrl = 'http://example.com/image.jpg';
    const dest = path.join(__dirname, 'test-output.jpg');

    // Mock a failing HTTP request
    nock('http://example.com')
      .get('/image.jpg')
      .replyWithError('Network error');

    await expect(request({ url: testUrl, dest })).rejects.toBeDefined();

    // Clean up
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest);
    }
  });
});