import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { join } from 'path';
import { mkdir, rm, access } from 'fs/promises';

describe('image downloader', () => {
  it('should resolve relative destination path', async () => {
    const url = 'http://example.com/image.jpg';
    const dest = 'image.jpg';

    await image({ url, dest: './non-existent-directory/' + dest });
    await access(join(process.cwd(), 'non-existent-directory', dest)).then(() => {
      expect(true).toBe(true);
    }).catch(() => {
      throw new Error('File not found');
    });
  });
});