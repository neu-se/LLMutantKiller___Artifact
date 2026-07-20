import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as archiver from 'archiver';

describe('ZipAFolder.zip with uncompressed compression', () => {
  it('should use store compression when compression is uncompressed', async () => {
    const testDir = path.join(__dirname, 'test-dir');
    const testFile = path.join(testDir, 'test.txt');
    const zipFilePath = path.join(__dirname, 'test.zip');

    // Setup test directory and file
    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(testFile, 'test content');

    // Mock the archiver to verify the correct options are passed
    const originalZip = archiver.prototype.zip;
    let receivedOptions: any = null;
    archiver.prototype.zip = function(options: any) {
      receivedOptions = options;
      return originalZip.call(this, options);
    };

    try {
      await ZipAFolder.zip(testDir, zipFilePath, { compression: COMPRESSION_LEVEL.uncompressed });

      // Verify the zip file was created
      expect(fs.existsSync(zipFilePath)).toBe(true);

      // Verify the correct options were passed to archiver
      expect(receivedOptions).toBeDefined();
      expect(receivedOptions.store).toBe(true);
    } finally {
      // Cleanup
      if (fs.existsSync(zipFilePath)) {
        fs.unlinkSync(zipFilePath);
      }
      rimraf.sync(testDir);
      archiver.prototype.zip = originalZip;
    }
  });
});