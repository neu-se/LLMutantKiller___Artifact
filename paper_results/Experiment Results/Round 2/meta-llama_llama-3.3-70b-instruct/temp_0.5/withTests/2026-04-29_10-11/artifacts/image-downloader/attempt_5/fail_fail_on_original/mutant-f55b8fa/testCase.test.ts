import { image } from '../index';
import * as path from 'path';
import * as fs from 'fs';

describe('image downloader', () => {
  it('should resolve relative paths correctly', () => {
    const url = 'http://someurl.com/image.jpg';
    const dest = '/absolute/path/to/image.jpg';

    return image({ url, dest }).then(({ filename }) => {
      expect(filename).toBe(path.resolve(dest));
    });
  });
});