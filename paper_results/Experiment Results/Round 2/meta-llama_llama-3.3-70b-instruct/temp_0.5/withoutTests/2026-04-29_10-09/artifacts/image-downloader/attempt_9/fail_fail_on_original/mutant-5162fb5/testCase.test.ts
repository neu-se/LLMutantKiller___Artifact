import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { promises as fs } from 'fs';
import { join } from 'path';

describe('image downloader', () => {
  it('should resolve the destination path correctly when it is relative', async () => {
    const destDir = './testDir';
    const destFile = 'testFile.jpg';
    const destPath = join(destDir, destFile);
    await fs.mkdir(destDir);
    try {
      await image({
        url: 'https://picsum.photos/200/300',
        dest: destPath,
      });
      const stats = await fs.stat(destPath);
      expect(stats).toBeUndefined();
    } catch (error) {
      throw error;
    } finally {
      await fs.rm(destDir, { recursive: true });
    }
  });
});