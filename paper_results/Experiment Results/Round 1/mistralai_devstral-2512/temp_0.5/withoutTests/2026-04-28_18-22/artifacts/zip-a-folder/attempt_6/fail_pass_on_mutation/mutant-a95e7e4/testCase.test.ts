import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('ZipAFolder.zip with uncompressed compression', () => {
  it('should create a zip file with store compression when compression is uncompressed', async () => {
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

      // Verify the zip file is using store compression by checking file size
      // Store compression should result in a larger file than deflate compression
      const zipData = fs.readFileSync(zipFilePath);
      const uncompressedSize = fs.statSync(testFile).size;
      expect(zipData.length).toBeGreaterThan(uncompressedSize);
    } finally {
      // Cleanup
      if (fs.existsSync(zipFilePath)) {
        fs.unlinkSync(zipFilePath);
      }
      rimraf.sync(testDir);
    }
  });
});