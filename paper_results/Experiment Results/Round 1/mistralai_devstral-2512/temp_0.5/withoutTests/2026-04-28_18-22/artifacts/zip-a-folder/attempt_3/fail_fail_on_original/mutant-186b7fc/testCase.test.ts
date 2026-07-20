import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { promisify } from 'util';

const rimrafAsync = promisify(rimraf);

describe('ZipAFolder.tar with uncompressed option', () => {
  it('should create an uncompressed tar archive when compression is set to uncompressed', async () => {
    const testDir = path.join(__dirname, 'test-dir');
    const outputFile = path.join(__dirname, 'output.tar');

    // Setup: Create test directory and file
    await fs.promises.mkdir(testDir, { recursive: true });
    const testFile = path.join(testDir, 'test.txt');
    await fs.promises.writeFile(testFile, 'test content');

    // Test: Create uncompressed tar
    await ZipAFolder.tar(testDir, outputFile, { compression: COMPRESSION_LEVEL.uncompressed });

    // Verify: Check if the tar file was created
    const fileExists = await fs.promises.access(outputFile)
      .then(() => true)
      .catch(() => false);

    expect(fileExists).toBe(true);

    // Cleanup
    await rimrafAsync(testDir);
    await rimrafAsync(outputFile);
  });
});