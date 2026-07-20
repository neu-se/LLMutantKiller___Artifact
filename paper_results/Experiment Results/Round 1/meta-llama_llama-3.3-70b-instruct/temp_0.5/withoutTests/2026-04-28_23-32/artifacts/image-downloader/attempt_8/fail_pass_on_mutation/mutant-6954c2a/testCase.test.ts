import { join } from 'path';
import { tmpdir } from 'os';
import request from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';

describe('request', () => {
  it('should reject with a meaningful error message when the status code is not 200', async () => {
    const url = 'http://example.com';
    const dest = join(tmpdir(), 'test.txt');
    try {
      await request({ url, dest });
    } catch (error) {
      expect(error.message).not.toBe('');
    }
  });
});