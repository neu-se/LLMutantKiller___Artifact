import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';
import fs from 'fs';
import path from 'path';

describe('download an image', () => {
  it('should resolve the destination path when it is absolute', () => {
    const dest = '/absolute/path/test-image.jpg';
    const url = 'http://someurl.com/image-success.png';

    return image({ url, dest })
     .then((result: any) => {
        expect(result.filename).toEqual(dest);
      });
  });
});