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
      const directory = await fs.readdir(destDir);
      expect(directory).toContain(destFile);
      const stats = await fs.stat(join(destDir, destFile));
      expect(stats.isFile()).toBe(true);
      const absoluteDestPath = join(process.cwd(), destDir, destFile);
      const stats2 = await fs.stat(absoluteDestPath);
      expect(stats2.isDirectory()).toBe(false);
    } catch (error) {
      throw error;
    } finally {
      await fs.rm(destDir, { recursive: true });
    }
  });
});