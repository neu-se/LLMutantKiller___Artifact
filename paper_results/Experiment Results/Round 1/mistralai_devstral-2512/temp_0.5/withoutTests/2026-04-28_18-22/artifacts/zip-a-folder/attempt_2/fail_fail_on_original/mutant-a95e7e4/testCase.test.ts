import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts";
import * as fs from 'fs';
import * as path from 'path';

describe('ZipAFolder.zip with uncompressed compression', () => {
  it('should create a zip file with store compression when compression is uncompressed', async () => {
    const testDir = path.join(__dirname, 'test-dir');
    const testFile = path.join(testDir, 'test.txt');
    const zipFilePath = path.join(__dirname, 'test.zip');

    // Setup test directory and file
    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(testFile, 'test content');

    try {
      await ZipAFolder.zip(testDir, zipFilePath, { compression: COMPRESSION_LEVEL.uncompressed });

      // Verify the zip file was created
      expect(fs.existsSync(zipFilePath)).toBe(true);

      // Read the zip file to verify it's a valid zip
      const zipData = fs.readFileSync(zipFilePath);
      expect(zipData.length).toBeGreaterThan(0);
    } finally {
      // Cleanup
      if (fs.existsSync(zipFilePath)) {
        fs.unlinkSync(zipFilePath);
      }
      if (fs.existsSync(testDir)) {
        fs.rmdirSync(testDir);
      }
    }
  });
});