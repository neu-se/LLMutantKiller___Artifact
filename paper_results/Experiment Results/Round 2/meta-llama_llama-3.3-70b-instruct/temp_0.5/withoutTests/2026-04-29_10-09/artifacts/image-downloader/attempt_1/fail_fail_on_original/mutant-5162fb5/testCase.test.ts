import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { promises as fs } from 'fs';

describe('image downloader', () => {
  it('should resolve the destination path correctly when it is relative', async () => {
    const destDir = './testDir';
    const destFile = 'testFile.jpg';
    const destPath = path.join(destDir, destFile);
    await fs.mkdir(destDir);
    try {
      await image({
        url: 'https://example.com/image.jpg',
        dest: destPath,
      });
      const stats = await fs.stat(destPath);
      expect(stats.isFile()).toBe(true);
    } finally {
      await fs.rm(destDir, { recursive: true });
    }
  });
});