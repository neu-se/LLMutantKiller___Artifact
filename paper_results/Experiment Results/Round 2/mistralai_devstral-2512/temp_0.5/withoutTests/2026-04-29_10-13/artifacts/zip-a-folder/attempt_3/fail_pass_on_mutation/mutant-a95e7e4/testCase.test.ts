import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as crypto from 'crypto';

describe('ZipAFolder.uncompressedZipBehavior', () => {
  it('should create uncompressed zip with store option when compression is uncompressed', async () => {
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

      // Read the zip file and verify it's not using compression
      const zipContent = fs.readFileSync(destFile);
      // Uncompressed zip files should contain the file content in plain form
      // The test file content should appear in the zip (with some zip headers)
      expect(zipContent.includes(Buffer.from(testFileContent))).toBe(true);
    } finally {
      // Cleanup
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });
});