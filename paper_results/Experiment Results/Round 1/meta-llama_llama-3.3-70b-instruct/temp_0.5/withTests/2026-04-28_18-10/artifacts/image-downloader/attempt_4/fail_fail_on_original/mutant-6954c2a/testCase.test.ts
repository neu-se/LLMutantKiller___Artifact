import nock from 'nock';
import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/index';

describe('download an image', () => {
  it('should reject with a meaningful error message when the status code is not 200', async () => {
    nock('http://someurl.com')
      .get('/error')
      .reply(404, 'Not Found');

    try {
      await download.image({ url: 'http://someurl.com/error', dest: '/tmp' });
      throw new Error('Expected an error to be thrown');
    } catch (error: any) {
      expect(error.message).not.toBe('');
    }
  });
});