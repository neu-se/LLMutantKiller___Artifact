import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index';
import fs from 'fs';
import path from 'path';

describe('image downloader', () => {
  it('should resolve relative path correctly', () => {
    const dest = './test-image.jpg';
    const url = 'http://someurl.com/image.jpg';
    return image({ url, dest })
      .then(({ filename }) => {
        expect(path.relative(process.cwd(), filename)).toBe('./test-image.jpg');
      });
  });
});