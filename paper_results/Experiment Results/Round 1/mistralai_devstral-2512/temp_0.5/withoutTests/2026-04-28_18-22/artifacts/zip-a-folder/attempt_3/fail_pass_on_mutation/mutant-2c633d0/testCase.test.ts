import { ZipAFolder } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as zlib from 'zlib';

describe('ZipAFolder.tar compression level verification', () => {
  it('should use high compression level when no options are provided', async () => {
    const testDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'zip-test-'));
    const srcDir = path.join(testDir, 'src');
    const outputFile = path.join(testDir, 'output.tar.gz');

    await fs.promises.mkdir(srcDir);
    const testContent = 'a'.repeat(10000);
    await fs.promises.writeFile(path.join(srcDir, 'test.txt'), testContent);

    try {
      await ZipAFolder.tar(srcDir, outputFile);

      const compressedData = await fs.promises.readFile(outputFile);
      const decompressed = zlib.gunzipSync(compressedData);
      const compressionRatio = compressedData.length / decompressed.length;

      expect(compressionRatio).toBeLessThan(0.5);
    } finally {
      await fs.promises.rm(testDir, { recursive: true, force: true });
    }
  });
});