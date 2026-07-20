const request = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request');
const fs = require('fs');
const path = require('path');

describe('download an image', () => {
  it('should handle write stream errors during download', async () => {
    const mockUrl = 'http://someurl.com/image-success.png';
    const invalidDest = '/invalid/directory/structure/that/does/not/exist/image.png';

    await expect(request({ url: mockUrl, dest: invalidDest }))
      .rejects.toThrow();
  });
});