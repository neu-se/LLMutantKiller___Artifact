import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('ZipAFolder.uncompressedZipBehavior', () => {
  it('should use store option for uncompressed zip files', async () => {
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

      // Read the zip file and check for uncompressed storage method
      // Uncompressed zip files should have local file headers with compression method 0 (stored)
      const zipContent = fs.readFileSync(destFile);
      const headerSignature = zipContent.subarray(0, 4).toString('hex');
      expect(headerSignature).toBe('504b0304'); // ZIP local file header signature

      // Check compression method (bytes 8-9 should be 0x0000 for stored)
      const compressionMethod = zipContent.subarray(8, 10).toString('hex');
      expect(compressionMethod).toBe('0000');
    } finally {
      // Cleanup
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });
});