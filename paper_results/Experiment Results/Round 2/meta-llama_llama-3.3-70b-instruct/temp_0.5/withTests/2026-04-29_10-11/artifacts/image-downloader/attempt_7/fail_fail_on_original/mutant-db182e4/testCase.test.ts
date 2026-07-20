import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index';
import fs from 'fs';
import path from 'path';

describe('image downloader', () => {
  it('should resolve relative path correctly when extractFilename is false', () => {
    const dest = './test-image';
    const url = 'http://someurl.com/image.jpg';
    return image({ url, dest, extractFilename: false })
      .then(({ filename }) => {
        expect(filename).toBe(path.resolve(dest));
      });
  });
});