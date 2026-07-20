import * as fs from 'fs';
import * as path from 'path';
import * as nock from 'nock';
import { download } from '../index';

describe('download an image', () => {
  it('should handle write stream errors during download', async () => {
    const mockUrl = 'http://someurl.com/image-error-stream.png';
    const dest = path.join(__dirname, 'fixtures', 'test-error-stream.png');

    // Mock a successful HTTP response but with a write stream error
    nock('http://someurl.com')
      .get('/image-error-stream.png')
      .reply(200, 'test data');

    // Create a directory that will cause write stream error
    const invalidDir = path.join(__dirname, 'invalid', 'nested', 'dir');
    const invalidDest = path.join(invalidDir, 'image.png');

    await expect(download.image({ url: mockUrl, dest: invalidDest }))
      .rejects.toThrow();
  });
});