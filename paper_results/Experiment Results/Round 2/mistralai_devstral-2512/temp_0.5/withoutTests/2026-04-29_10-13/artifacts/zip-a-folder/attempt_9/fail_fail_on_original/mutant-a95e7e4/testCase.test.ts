import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as crypto from 'crypto';
import * as archiver from 'archiver';

describe('ZipAFolder.uncompressedZipBehavior', () => {
  it('should use store option for uncompressed compression level', async () => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
    const srcDir = path.join(testDir, 'source');
    const destFile = path.join(testDir, 'output.zip');

    try {
      // Create source directory with a test file
      fs.mkdirSync(srcDir);
      const testContent = crypto.randomBytes(10000).toString('hex');
      fs.writeFileSync(path.join(srcDir, 'test.txt'), testContent);

      // Mock the archiver to verify the options passed
      const originalArchiver = archiver;
      const archiverSpy = jest.spyOn(originalArchiver, 'zip');

      // Create uncompressed zip
      await ZipAFolder.zip(srcDir, destFile, { compression: COMPRESSION_LEVEL.uncompressed });

      // Verify the archiver was called with store: true for uncompressed
      expect(archiverSpy).toHaveBeenCalledWith(expect.objectContaining({
        store: true
      }));

      // Verify the zip file was created
      expect(fs.existsSync(destFile)).toBe(true);
    } finally {
      // Cleanup
      fs.rmSync(testDir, { recursive: true, force: true });
      jest.restoreAllMocks();
    }
  });
});