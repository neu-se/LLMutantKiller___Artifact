import * as path from 'path';

const nock = require('nock');
const request = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js');

nock('http://someurl.com')
  .get('/image-write-error-test.png')
  .reply(200, Buffer.from('fake image data'), {
    'Content-Type': 'image/png',
  });

describe('request write stream error handling', () => {
  it('should reject the promise when the write stream emits an error due to invalid destination', async () => {
    // Use a destination path that will cause a write stream error
    // (non-existent nested directory that cannot be created)
    const invalidDest = '/nonexistent_root_dir_xyz_abc/deeply/nested/image.png';

    await expect(
      request({
        url: 'http://someurl.com/image-write-error-test.png',
        dest: invalidDest,
      })
    ).rejects.toThrow();
  });
});