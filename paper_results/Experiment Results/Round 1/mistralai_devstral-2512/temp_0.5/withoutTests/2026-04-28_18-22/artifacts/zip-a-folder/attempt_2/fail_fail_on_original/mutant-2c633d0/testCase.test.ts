import { ZipAFolder } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('ZipAFolder.tar default compression behavior', () => {
  it('should apply compression when no options are provided', async () => {
    const testDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'zip-test-'));
    const srcDir = path.join(testDir, 'src');
    const outputFile = path.join(testDir, 'output.tar.gz');

    await fs.promises.mkdir(srcDir);
    await fs.promises.writeFile(path.join(srcDir, 'test.txt'), 'test content');

    try {
      await ZipAFolder.tar(srcDir, outputFile);

      const stats = await fs.promises.stat(outputFile);
      expect(stats.size).toBeGreaterThan(0);

      const fileContent = await fs.promises.readFile(outputFile);
      expect(fileContent.length).toBeGreaterThan(0);

      const uncompressedSize = (await fs.promises.readFile(path.join(srcDir, 'test.txt'))).length;
      expect(fileContent.length).toBeLessThan(uncompressedSize);
    } finally {
      await fs.promises.rm(testDir, { recursive: true, force: true });
    }
  });
});