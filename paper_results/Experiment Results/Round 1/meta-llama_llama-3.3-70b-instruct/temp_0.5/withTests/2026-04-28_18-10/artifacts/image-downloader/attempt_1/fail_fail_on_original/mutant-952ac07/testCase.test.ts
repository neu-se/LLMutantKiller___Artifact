import nock from 'nock';
import { download } from '../../../../../../../../subject_repositories/image-downloader/lib/index';

describe('download an image', () => {
  it('should fail when the request error event is not handled', async () => {
    nock('http://someurl.com')
      .get('/error')
      .times(1)
      .reply(200, 'Hello World', {
        'Content-Type': 'text/plain',
      });

    nock('http://someurl.com')
      .get('/error')
      .times(1)
      .replyWithError({ code: 'ECONNRESET' });

    await expect(download.image({ url: 'http://someurl.com/error', dest: '/tmp' })).rejects.toThrow();
  });
});