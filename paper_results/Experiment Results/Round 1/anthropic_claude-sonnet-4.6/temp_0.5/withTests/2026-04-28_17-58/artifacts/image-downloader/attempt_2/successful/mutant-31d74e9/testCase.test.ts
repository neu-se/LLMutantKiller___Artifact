import * as path from 'path';

const nock = require('nock');
const requestModule = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js');

// Set up nock to intercept HTTP requests and return actual data
nock('http://testurl-error.com')
  .get('/test-write-error.jpg')
  .reply(200, Buffer.from('fake image data'), {
    'Content-Type': 'image/jpeg',
  });

describe('request write stream error handling', () => {
  it('should reject when the write stream emits an error due to invalid destination path', async () => {
    // Use a path that doesn't exist to trigger a write stream error
    const invalidDest = '/nonexistent/deeply/nested/directory/that/does/not/exist/image.jpg';

    await expect(
      requestModule({
        url: 'http://testurl-error.com/test-write-error.jpg',
        dest: invalidDest,
      })
    ).rejects.toThrow();
  });
});