import { image } from '../index';
import fs from 'fs';
import path from 'path';

describe('image downloader', () => {
  it('should resolve relative path correctly when extractFilename is false', () => {
    const dest = './test-image';
    const url = 'http://someurl.com/image.jpg';
    const currentDir = process.cwd();
    return image({ url, dest, extractFilename: false })
      .then(({ filename }) => {
        expect(path.relative(currentDir, filename)).toBe(`./${path.basename(dest)}`);
      });
  });
});