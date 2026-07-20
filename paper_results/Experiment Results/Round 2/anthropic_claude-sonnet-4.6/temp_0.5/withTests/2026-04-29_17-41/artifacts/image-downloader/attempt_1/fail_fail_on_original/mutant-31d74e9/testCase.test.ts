import * as path from 'path';
import * as nock from 'nock';
import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';

const nockInstance = nock('http://someurl.com')
  .get('/image-write-error-test.png')
  .reply(200, Buffer.from('fake image data'), {
    'Content-Type': 'image/png',
  });

describe('request write stream error handling', () => {
  it('should reject the promise when the write stream emits an error', async () => {
    // Use a destination path that will cause a write stream error
    // (non-existent nested directory)
    const invalidDest = '/nonexistent/deeply/nested/directory/that/does/not/exist/image.png';

    await expect(
      request({
        url: 'http://someurl.com/image-write-error-test.png',
        dest: invalidDest,
      })
    ).rejects.toThrow();
  });
});