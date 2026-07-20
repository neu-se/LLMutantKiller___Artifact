import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';
import * as path from 'path';

describe('image downloader', () => {
  it('should resolve the destination path correctly', async () => {
    const url = 'http://someurl.com/image-success.png';
    const dest = './image-success.png';

    const result = await image({ url, dest, extractFilename: false });
    expect(path.isAbsolute(result.filename)).toBe(true);
  });
});