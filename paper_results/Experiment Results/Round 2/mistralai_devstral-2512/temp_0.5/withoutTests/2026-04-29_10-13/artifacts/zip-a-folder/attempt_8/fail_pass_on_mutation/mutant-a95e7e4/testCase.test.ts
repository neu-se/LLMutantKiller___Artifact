import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as crypto from 'crypto';

describe('ZipAFolder.uncompressedZipBehavior', () => {
  it('should use store option when compression is uncompressed', async () => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
    const srcDir = path.join(testDir, 'source');
    const destFile = path.join(testDir, 'output.zip');

    try {
      // Create source directory with a test file
      fs.mkdirSync(srcDir);
      const testContent = crypto.randomBytes(10000).toString('hex'); // Large content to ensure compression difference
      fs.writeFileSync(path.join(srcDir, 'test.txt'), testContent);

      // Create uncompressed zip
      await ZipAFolder.zip(srcDir, destFile, { compression: COMPRESSION_LEVEL.uncompressed });

      // Verify the zip file was created
      expect(fs.existsSync(destFile)).toBe(true);

      // In the original code, uncompressed zip should be significantly larger than compressed
      // The mutated code will use compression instead, making the file smaller
      const zipStats = fs.statSync(destFile);
      const originalSize = fs.statSync(path.join(srcDir, 'test.txt')).size;

      // Uncompressed zip should be at least 90% of original size (with zip headers)
      // Compressed zip would be much smaller (especially with 10KB of hex data)
      expect(zipStats.size).toBeGreaterThan(originalSize * 0.9);
    } finally {
      // Cleanup
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });
});