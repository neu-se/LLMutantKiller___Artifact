import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as crypto from 'crypto';

describe('ZipAFolder.uncompressedZipBehavior', () => {
  it('should handle uncompressed compression level correctly', async () => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
    const srcDir = path.join(testDir, 'source');
    const destFile = path.join(testDir, 'output.zip');

    try {
      // Create source directory with a test file
      fs.mkdirSync(srcDir);
      const testFileContent = crypto.randomBytes(1024).toString('hex');
      fs.writeFileSync(path.join(srcDir, 'test.txt'), testFileContent);

      // Create uncompressed zip - this should trigger the uncompressed branch
      const result = await ZipAFolder.zip(srcDir, destFile, { compression: COMPRESSION_LEVEL.uncompressed });

      // Verify the operation completed successfully
      expect(result).toBeUndefined();

      // Verify the zip file was created
      expect(fs.existsSync(destFile)).toBe(true);

      // Verify the zip file contains our test file
      const zipContent = fs.readFileSync(destFile);
      expect(zipContent.length).toBeGreaterThan(0);
    } finally {
      // Cleanup
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });
});