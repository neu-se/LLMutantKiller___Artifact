import nock from 'nock';
import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';

describe('request error message', () => {
  it('should include the status code in the error message when response is not 200', async () => {
    nock('http://testurl.com')
      .get('/image-404.jpg')
      .reply(404, 'Not Found');

    await expect(
      request({ url: 'http://testurl.com/image-404.jpg', dest: '/tmp/image-404.jpg' })
    ).rejects.toThrow('Status Code: 404');
  });
});