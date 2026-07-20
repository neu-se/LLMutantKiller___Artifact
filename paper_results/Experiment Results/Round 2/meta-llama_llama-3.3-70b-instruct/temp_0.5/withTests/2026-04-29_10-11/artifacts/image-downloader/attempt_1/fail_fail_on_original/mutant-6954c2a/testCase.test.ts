import nock from 'nock';
import { download } from '../index';
import { TimeoutError } from '../lib/TimeoutError';

describe('download an image', () => {
  it('should reject with a meaningful error message when the status code is not 200', async () => {
    nock('http://someurl.com')
      .get(/error/)
      .reply(404, 'Not Found');

    await expect(download.image({ url: 'http://someurl.com/error', dest: '/tmp' })).rejects.toThrowError('Request Failed.\nStatus Code: 404');
  });
});