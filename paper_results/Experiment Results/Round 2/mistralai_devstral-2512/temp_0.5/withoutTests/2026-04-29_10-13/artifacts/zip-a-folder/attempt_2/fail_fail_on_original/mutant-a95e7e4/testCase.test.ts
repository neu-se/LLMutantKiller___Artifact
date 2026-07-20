import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as crypto from 'crypto';
import * as archiver from 'archiver';

describe('ZipAFolder.uncompressedZipBehavior', () => {
  it('should use store option for uncompressed zip', async () => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
    const srcDir = path.join(testDir, 'source');
    const destFile = path.join(testDir, 'output.zip');

    try {
      // Create source directory with a test file
      fs.mkdirSync(srcDir);
      const testFileContent = crypto.randomBytes(1024).toString('hex');
      fs.writeFileSync(path.join(srcDir, 'test.txt'), testFileContent);

      // Spy on archiver to check if store option is used
      const originalZip = archiver.zip;
      const spy = jest.fn((options?: archiver.ArchiverOptions) => {
        expect(options?.store).toBe(true);
        return originalZip(options);
      });
      jest.spyOn(archiver, 'zip').mockImplementation(spy as any);

      // Create uncompressed zip
      await ZipAFolder.zip(srcDir, destFile, { compression: COMPRESSION_LEVEL.uncompressed });

      // Verify the spy was called with store: true
      expect(spy).toHaveBeenCalledWith(expect.objectContaining({ store: true }));

      // Verify the zip file was created
      expect(fs.existsSync(destFile)).toBe(true);
    } finally {
      // Cleanup
      fs.rmSync(testDir, { recursive: true, force: true });
      jest.restoreAllMocks();
    }
  });
});