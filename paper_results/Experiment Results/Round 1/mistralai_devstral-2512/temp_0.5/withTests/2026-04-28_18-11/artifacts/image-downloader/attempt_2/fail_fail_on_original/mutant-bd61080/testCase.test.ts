import * as nock from 'nock';
import * as path from 'path';
import { download } from '../../index';

describe('Error message validation', () => {
  it('should include status code in error message for non-200 responses', async () => {
    nock('http://example.com')
      .get('/test')
      .reply(404, 'Not Found');

    try {
      await download.image({ url: 'http://example.com/test', dest: '/tmp/test.jpg' });
      fail('Expected download to fail');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toContain('Status Code: 404');
    }
  });
});