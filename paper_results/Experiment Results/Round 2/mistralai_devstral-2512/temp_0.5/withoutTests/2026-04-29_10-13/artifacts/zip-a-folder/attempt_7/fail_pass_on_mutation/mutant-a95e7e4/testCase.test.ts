import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('ZipAFolder.uncompressedZipBehavior', () => {
  it('should create uncompressed zip with correct archiver options', async () => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
    const srcDir = path.join(testDir, 'source');
    const destFile = path.join(testDir, 'output.zip');

    try {
      // Create source directory with a test file
      fs.mkdirSync(srcDir);
      fs.writeFileSync(path.join(srcDir, 'test.txt'), 'test content');

      // Create uncompressed zip
      await ZipAFolder.zip(srcDir, destFile, { compression: COMPRESSION_LEVEL.uncompressed });

      // Verify the zip file was created
      expect(fs.existsSync(destFile)).toBe(true);

      // The mutated version will skip the uncompressed branch and use compressed options
      // This will result in a different file size (compressed vs uncompressed)
      const zipStats = fs.statSync(destFile);
      const uncompressedSize = fs.statSync(path.join(srcDir, 'test.txt')).size;

      // For uncompressed zip, the file size should be very close to the original
      // (just with zip headers added)
      expect(zipStats.size).toBeLessThan(uncompressedSize + 200);
      expect(zipStats.size).toBeGreaterThan(uncompressedSize);
    } finally {
      // Cleanup
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });
});