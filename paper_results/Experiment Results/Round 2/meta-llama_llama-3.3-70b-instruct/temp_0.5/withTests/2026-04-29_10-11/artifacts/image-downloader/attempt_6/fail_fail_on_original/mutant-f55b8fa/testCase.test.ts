import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index';
import * as path from 'path';

describe('image downloader', () => {
  it('should resolve relative paths correctly', () => {
    const url = 'http://someurl.com/image.jpg';
    const dest = '/absolute/path/to/image.jpg';

    return image({ url, dest, extractFilename: false }).then(({ filename }) => {
      expect(filename).toBe(dest);
    });
  });
});