import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as crypto from 'crypto';

describe('ZipAFolder.uncompressedZip', () => {
  it('should create a zip file with uncompressed compression level', async () => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
    const srcDir = path.join(testDir, 'source');
    const destFile = path.join(testDir, 'output.zip');

    try {
      // Create source directory with a test file
      fs.mkdirSync(srcDir);
      const testFileContent = crypto.randomBytes(1024).toString('hex');
      fs.writeFileSync(path.join(srcDir, 'test.txt'), testFileContent);

      // Create uncompressed zip
      await ZipAFolder.zip(srcDir, destFile, { compression: COMPRESSION_LEVEL.uncompressed });

      // Verify the zip file was created
      expect(fs.existsSync(destFile)).toBe(true);

      // Verify the zip file is not empty
      const zipStats = fs.statSync(destFile);
      expect(zipStats.size).toBeGreaterThan(0);
    } finally {
      // Cleanup
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });
});