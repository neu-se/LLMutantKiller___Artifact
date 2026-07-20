import nock from 'nock';
import { download } from '../index';

describe('download an image with non-200 status code', () => {
  it('should throw an error with the status code', async () => {
    nock('http://someurl.com')
      .get('/error')
      .reply(404, 'Not Found');

    try {
      await download.image({ url: 'http://someurl.com/error', dest: '/tmp' });
      throw new Error('Expected an error to be thrown');
    } catch (error: any) {
      if (!error.message.includes('Status Code:')) {
        throw new Error('Error message does not contain status code');
      }
    }
  });
});