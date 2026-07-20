import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';
import fs from 'fs';
import path from 'path';

describe('download an image', () => {
  it('should resolve the destination path when it is not absolute', () => {
    const dest = './test-image.jpg';
    const url = 'http://someurl.com/image-success.png';

    return image({ url, dest })
     .then((result: any) => {
        expect(path.isAbsolute(result.filename)).toBe(true);
      });
  });
});