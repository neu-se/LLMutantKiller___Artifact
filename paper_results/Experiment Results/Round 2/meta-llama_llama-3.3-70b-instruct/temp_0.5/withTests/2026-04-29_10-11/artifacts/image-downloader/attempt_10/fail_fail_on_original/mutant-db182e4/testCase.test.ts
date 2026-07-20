import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';
import fs from 'fs';
import path from 'path';

describe('image downloader', () => {
  it('should resolve relative path correctly when extractFilename is false', () => {
    const dest = './test-image.jpg';
    const url = 'http://someurl.com/image.jpg';
    return image({ url, dest, extractFilename: false })
      .then(({ filename }) => {
        expect(path.dirname(filename)).toBe(path.resolve('.'));
      });
  });
});