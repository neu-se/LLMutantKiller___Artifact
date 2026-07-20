import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('ZipAFolder.zip compression behavior', () => {
  it('should use store compression when compression is uncompressed', async () => {
    const testDir = path.join(__dirname, 'test-dir');
    const testFile = path.join(testDir, 'test.txt');
    const zipFilePath = path.join(__dirname, 'test.zip');
    const compressedZipPath = path.join(__dirname, 'test-compressed.zip');

    // Setup test directory and file
    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(testFile, 'test content');

    try {
      // Create zip with uncompressed compression
      await ZipAFolder.zip(testDir, zipFilePath, { compression: COMPRESSION_LEVEL.uncompressed });

      // Create zip with medium compression
      await ZipAFolder.zip(testDir, compressedZipPath, { compression: COMPRESSION_LEVEL.medium });

      // Verify both files were created
      expect(fs.existsSync(zipFilePath)).toBe(true);
      expect(fs.existsSync(compressedZipPath)).toBe(true);

      // The uncompressed zip should be larger than the compressed one
      const uncompressedSize = fs.statSync(zipFilePath).size;
      const compressedSize = fs.statSync(compressedZipPath).size;
      expect(uncompressedSize).toBeGreaterThan(compressedSize);
    } finally {
      // Cleanup
      if (fs.existsSync(zipFilePath)) {
        fs.unlinkSync(zipFilePath);
      }
      if (fs.existsSync(compressedZipPath)) {
        fs.unlinkSync(compressedZipPath);
      }
      rimraf.sync(testDir);
    }
  });
});