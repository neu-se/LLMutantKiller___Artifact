import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index';
import * as path from 'path';

describe('image downloader', () => {
  it('should resolve relative paths correctly', () => {
    const url = 'http://someurl.com/image.jpg';
    const dest = './image.jpg';

    return image({ url, dest }).then(({ filename }) => {
      expect(filename).not.toContain('..');
    });
  });
});