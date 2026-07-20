import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index';
import fs from 'fs';
import path from 'path';

describe('image downloader', () => {
  it('should not resolve relative path when already absolute', () => {
    const dest = '/tmp/test-image.jpg';
    const url = 'http://someurl.com/image.jpg';
    return image({ url, dest })
      .then(({ filename }) => {
        expect(filename).toBe(dest);
      });
  });
});