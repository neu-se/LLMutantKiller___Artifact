import * as fs from 'fs';
import * as path from 'path';
import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/index';

describe('download an image', () => {
  it('should handle write stream errors during download', async () => {
    const mockUrl = 'http://someurl.com/image-success.png';
    const invalidDest = '/invalid/directory/structure/that/does/not/exist/image.png';

    await expect(download.image({ url: mockUrl, dest: invalidDest }))
      .rejects.toThrow();
  });
});