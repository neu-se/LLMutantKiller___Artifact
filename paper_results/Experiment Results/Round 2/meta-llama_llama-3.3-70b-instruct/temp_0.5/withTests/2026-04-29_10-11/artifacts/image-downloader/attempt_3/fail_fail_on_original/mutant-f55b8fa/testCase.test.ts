import { image } from '../index';
import * as path from 'path';
import * as fs from 'fs';

describe('image downloader', () => {
  it('should resolve relative paths correctly', () => {
    const url = 'http://someurl.com/image.jpg';
    const dest = './image.jpg';

    return image({ url, dest }).then(({ filename }) => {
      expect(path.isAbsolute(filename)).toBe(true);
      fs.unlinkSync(filename);
    });
  });
});