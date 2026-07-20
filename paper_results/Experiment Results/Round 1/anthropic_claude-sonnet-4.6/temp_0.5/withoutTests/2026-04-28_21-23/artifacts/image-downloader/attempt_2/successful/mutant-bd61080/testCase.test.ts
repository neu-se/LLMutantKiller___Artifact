import nock = require('nock');
import download = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js');

describe('request', () => {
  it('should include the status code in the error message when receiving a non-200 response', async () => {
    nock('http://example.com')
      .get('/image.jpg')
      .reply(404, '');

    await expect(
      download({ url: 'http://example.com/image.jpg', dest: '/tmp/test.jpg' })
    ).rejects.toThrow('Status Code: 404');
  });
});