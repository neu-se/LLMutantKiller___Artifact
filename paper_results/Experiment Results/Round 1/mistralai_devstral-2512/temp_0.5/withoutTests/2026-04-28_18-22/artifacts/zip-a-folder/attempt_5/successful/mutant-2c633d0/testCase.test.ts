import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('ZipAFolder.tar compression level', () => {
  it('should use high compression when no options are provided', async () => {
    const testDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'zip-test-'));
    const srcDir = path.join(testDir, 'src');
    const outputFile = path.join(testDir, 'output.tar.gz');

    await fs.promises.mkdir(srcDir);
    const testContent = 'a'.repeat(10000);
    await fs.promises.writeFile(path.join(srcDir, 'test.txt'), testContent);

    try {
      await ZipAFolder.tar(srcDir, outputFile, { compression: COMPRESSION_LEVEL.high });

      const stats = await fs.promises.stat(outputFile);
      const highCompressionSize = stats.size;

      const outputFile2 = path.join(testDir, 'output2.tar.gz');
      await ZipAFolder.tar(srcDir, outputFile2);

      const stats2 = await fs.promises.stat(outputFile2);
      const defaultCompressionSize = stats2.size;

      expect(defaultCompressionSize).toBeLessThanOrEqual(highCompressionSize);
    } finally {
      await fs.promises.rm(testDir, { recursive: true, force: true });
    }
  });
});