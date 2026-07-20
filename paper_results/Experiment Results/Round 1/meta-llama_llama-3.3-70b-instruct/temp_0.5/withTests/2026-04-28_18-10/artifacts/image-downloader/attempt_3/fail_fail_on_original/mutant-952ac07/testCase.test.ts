import { download } from '../../../../../../../../subject_repositories/image-downloader/lib/index';
import nock from 'nock';

describe('download an image', () => {
  it('should handle request error event', async () => {
    nock('http://someurl.com')
      .get('/success')
      .times(1)
      .reply(200);

    await expect(download.image({ url: 'http://someurl.com/success', dest: '/tmp' })).resolves.not.toThrow();
  });
});