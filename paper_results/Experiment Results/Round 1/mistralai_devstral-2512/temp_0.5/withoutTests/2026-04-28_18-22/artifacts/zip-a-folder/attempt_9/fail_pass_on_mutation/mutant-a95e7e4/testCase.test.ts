import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('ZipAFolder.zip compression behavior', () => {
  it('should use store compression when compression is uncompressed', async () => {
    const testDir = path.join(__dirname, 'test-dir');
    const testFile = path.join(testDir, 'test.txt');
    const zipFilePath = path.join(__dirname, 'test.zip');

    // Setup test directory and file
    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(testFile, 'test content');

    try {
      // Call zip with uncompressed compression
      await ZipAFolder.zip(testDir, zipFilePath, { compression: COMPRESSION_LEVEL.uncompressed });

      // Verify the zip file was created
      expect(fs.existsSync(zipFilePath)).toBe(true);

      // Read the zip file and check for store compression marker
      const zipData = fs.readFileSync(zipFilePath);
      // Store compression should have the compression method flag set to 0
      // in the local file header (offset 8-9)
      const compressionMethod = zipData.subarray(8, 10).readUInt16LE(0);
      expect(compressionMethod).toBe(0); // 0 means store compression
    } finally {
      // Cleanup
      if (fs.existsSync(zipFilePath)) {
        fs.unlinkSync(zipFilePath);
      }
      rimraf.sync(testDir);
    }
  });
});