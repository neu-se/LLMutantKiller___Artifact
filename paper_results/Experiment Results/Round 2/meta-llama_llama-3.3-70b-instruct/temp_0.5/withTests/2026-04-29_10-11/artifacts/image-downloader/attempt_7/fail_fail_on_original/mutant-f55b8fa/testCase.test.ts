import { image } from '../index';
import * as path from 'path';

describe('image downloader', () => {
  it('should resolve relative paths correctly', () => {
    const url = 'http://someurl.com/image.jpg';
    const dest = '/absolute/path/to/image.jpg';

    return image({ url, dest, extractFilename: false }).then(({ filename }) => {
      expect(path.isAbsolute(filename)).toBe(true);
      expect(filename).not.toBe(dest);
    });
  });
});