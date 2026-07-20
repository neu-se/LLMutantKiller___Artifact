import { image } from '../index';
import * as path from 'path';

describe('image downloader', () => {
  it('should resolve absolute paths correctly', () => {
    const url = 'http://someurl.com/image.jpg';
    const dest = '/absolute/path/to/image.jpg';

    return image({ url, dest }).then(({ filename }) => {
      expect(path.isAbsolute(filename)).toBe(true);
      if (path.isAbsolute(dest)) {
        expect(filename).toBe(path.resolve(dest));
      } else {
        expect(filename).not.toBe(dest);
      }
    });
  });
});