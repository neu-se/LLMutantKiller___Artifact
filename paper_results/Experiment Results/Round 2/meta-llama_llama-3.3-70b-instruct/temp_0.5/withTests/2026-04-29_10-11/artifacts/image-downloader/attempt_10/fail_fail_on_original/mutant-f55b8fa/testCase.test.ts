import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index';
import * as path from 'path';

describe('image downloader', () => {
  it('should resolve absolute paths correctly', () => {
    const url = 'http://someurl.com/image.jpg';
    const dest = '/absolute/path/to/image.jpg';

    return image({ url, dest }).then(({ filename }) => {
      expect(path.isAbsolute(filename)).toBe(true);
      expect(filename).not.toBe(dest);
    });
  });
});