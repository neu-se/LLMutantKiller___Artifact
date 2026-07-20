import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/index';
import * as fs from 'fs';
import * as path from 'path';

describe('image-downloader', () => {
  it('should resolve the destination path when it is relative', async () => {
    const url = 'http://someurl.com/image-success.png';
    const dest = './test/fixtures';
    try {
      const result = await download.image({ url, dest });
      const actualPath = path.resolve(process.cwd(), dest);
      expect(fs.existsSync(actualPath)).toBe(true);
      expect(fs.lstatSync(actualPath).isDirectory()).toBe(true);
    } catch (error) {
      throw error;
    }
  });
});