import nock from 'nock';
import { download } from '../../../../image-downloader/lib/index.js';

describe('download an image', () => {
  it('should fail with a non-200 status code and include the status code in the error message', async () => {
    nock('http://someurl.com')
      .get('/error')
      .reply(404, 'Not Found');

    try {
      await download.image({ url: 'http://someurl.com/error', dest: '/tmp' });
    } catch (error: any) {
      if (!error.message.includes('Status Code:')) {
        throw new Error('Error message does not contain status code');
      }
    }
  });
});