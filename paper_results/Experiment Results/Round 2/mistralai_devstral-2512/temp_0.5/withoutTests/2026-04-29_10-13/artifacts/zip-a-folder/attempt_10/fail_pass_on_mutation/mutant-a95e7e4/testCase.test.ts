import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as crypto from 'crypto';

describe('ZipAFolder.uncompressedZipBehavior', () => {
  it('should create uncompressed zip with store option when compression level is uncompressed', async () => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
    const srcDir = path.join(testDir, 'source');
    const destFile = path.join(testDir, 'output.zip');

    try {
      // Create source directory with a test file
      fs.mkdirSync(srcDir);
      const testContent = crypto.randomBytes(10000).toString('hex');
      fs.writeFileSync(path.join(srcDir, 'test.txt'), testContent);

      // Create uncompressed zip
      await ZipAFolder.zip(srcDir, destFile, { compression: COMPRESSION_LEVEL.uncompressed });

      // Verify the zip file was created
      expect(fs.existsSync(destFile)).toBe(true);

      // Read the zip file and check for uncompressed storage method
      // Uncompressed zip files should have local file headers with compression method 0 (stored)
      const zipContent = fs.readFileSync(destFile);

      // Find the local file header (signature: 0x504b0304)
      let offset = 0;
      while (offset < zipContent.length - 4) {
        if (zipContent.readUInt32LE(offset) === 0x04034b50) {
          // Check compression method (bytes 8-9 should be 0x0000 for stored)
          const compressionMethod = zipContent.readUInt16LE(offset + 8);
          expect(compressionMethod).toBe(0); // 0 means stored (uncompressed)
          break;
        }
        offset++;
      }
    } finally {
      // Cleanup
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });
});