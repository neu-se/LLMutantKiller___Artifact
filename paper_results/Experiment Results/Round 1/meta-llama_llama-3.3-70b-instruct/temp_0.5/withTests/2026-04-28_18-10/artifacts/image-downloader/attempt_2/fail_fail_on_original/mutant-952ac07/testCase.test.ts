import nock from 'nock';
import { download } from '../../lib/index';

describe('download an image', () => {
  it('should handle request error event', async () => {
    nock('http://someurl.com')
      .get('/error')
      .times(1)
      .replyWithError({ code: 'ECONNRESET' });

    await expect(download.image({ url: 'http://someurl.com/error', dest: '/tmp' })).rejects.toThrow();
  });
});