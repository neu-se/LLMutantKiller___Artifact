import { image } from '../index';
import fs from 'fs';
import path from 'path';

describe('image downloader', () => {
  it('should not modify absolute dest path when already absolute', () => {
    const dest = path.join(__dirname, 'test-image.jpg');
    const url = 'http://someurl.com/image.jpg';
    return image({ url, dest })
      .then(({ filename }) => {
        expect(filename).toBe(dest);
      });
  });
});