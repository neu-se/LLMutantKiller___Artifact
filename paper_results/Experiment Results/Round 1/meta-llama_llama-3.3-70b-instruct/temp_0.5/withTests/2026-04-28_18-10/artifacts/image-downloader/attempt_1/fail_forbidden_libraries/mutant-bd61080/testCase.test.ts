import nock from 'nock';
import { download } from '../index';
import { expect } from '@jest/globals';

describe('download an image with non-200 status code', () => {
  it('should throw an error with the status code', async () => {
    nock('http://someurl.com')
      .get('/error')
      .reply(404, 'Not Found');

    try {
      await download.image({ url: 'http://someurl.com/error', dest: '/tmp' });
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain('Status Code: 404');
    }
  });
});