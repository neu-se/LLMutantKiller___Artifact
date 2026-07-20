import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('ZipAFolder.uncompressedZipBehavior', () => {
  it('should throw error when compression is uncompressed with invalid options', async () => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
    const srcDir = path.join(testDir, 'source');
    const destFile = path.join(testDir, 'output.zip');

    try {
      // Create source directory
      fs.mkdirSync(srcDir);

      // This should trigger the uncompressed branch which is mutated to "if (false)"
      // In the mutated version, it will skip the uncompressed branch and go to the else branch
      // which requires different options, causing it to fail
      await expect(ZipAFolder.zip(srcDir, destFile, {
        compression: COMPRESSION_LEVEL.uncompressed
      })).resolves.toBeUndefined();

      // Verify the zip file was created
      expect(fs.existsSync(destFile)).toBe(true);
    } finally {
      // Cleanup
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });
});