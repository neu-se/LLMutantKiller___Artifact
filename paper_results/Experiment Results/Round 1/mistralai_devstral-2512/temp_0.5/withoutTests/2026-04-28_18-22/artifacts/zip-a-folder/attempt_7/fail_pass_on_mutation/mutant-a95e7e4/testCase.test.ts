import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('ZipAFolder.zip with uncompressed compression', () => {
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

      // Verify the file is a valid zip by checking magic number
      const zipData = fs.readFileSync(zipFilePath);
      expect(zipData.subarray(0, 2).toString('hex')).toBe('504b');

      // Verify the compression method is store (0x0000) by checking local file header
      // The compression method is at offset 8-9 in the local file header
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