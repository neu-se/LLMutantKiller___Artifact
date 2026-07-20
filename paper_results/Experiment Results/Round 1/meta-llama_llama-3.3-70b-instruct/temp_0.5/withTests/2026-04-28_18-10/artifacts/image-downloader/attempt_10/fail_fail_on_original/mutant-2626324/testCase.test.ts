import { download } from '../../index';
import * as fs from 'fs';
import * as path from 'path';

describe('image-downloader', () => {
  it('should resolve the destination path when it is relative', async () => {
    const url = 'http://someurl.com/image-success.png';
    const dest = './test/fixtures';
    try {
      await download.image({ url, dest, extractFilename: false });
      const actualPath = path.resolve(process.cwd(), dest);
      expect(fs.existsSync(actualPath)).toBe(true);
      expect(fs.lstatSync(actualPath).isDirectory()).toBe(true);
      const files = fs.readdirSync(actualPath);
      expect(files.length).toBe(1);
      expect(fs.lstatSync(path.join(actualPath, files[0])).isFile()).toBe(true);
    } catch (error) {
      throw error;
    }
  });
});