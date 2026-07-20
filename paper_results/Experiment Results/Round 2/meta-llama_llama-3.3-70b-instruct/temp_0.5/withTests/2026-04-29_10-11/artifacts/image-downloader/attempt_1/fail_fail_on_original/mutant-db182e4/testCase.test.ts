import { image } from '../../../index';
import fs from 'fs';
import path from 'path';

describe('image downloader', () => {
  it('should resolve relative path correctly', () => {
    const dest = 'test-image.jpg';
    const url = 'http://someurl.com/image.jpg';
    return image({ url, dest })
      .then(({ filename }) => {
        expect(filename).toEqual(path.resolve(__dirname, dest));
        expect(() => fs.accessSync(filename)).not.toThrow();
      });
  });
});