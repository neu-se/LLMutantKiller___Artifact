import nock from 'nock';
import request from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';

describe('request', () => {
  it('should include the status code in the error message when response status is not 200', async () => {
    nock('http://example.com')
      .get('/image.jpg')
      .reply(404, 'Not Found');

    await expect(
      request({ url: 'http://example.com/image.jpg', dest: '/tmp/test.jpg' })
    ).rejects.toThrow('Status Code: 404');
  });
});