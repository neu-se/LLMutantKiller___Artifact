import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as archiver from 'archiver';

describe('ZipAFolder.tar with uncompressed option', () => {
  it('should create an uncompressed tar archive without gzip when compression is set to uncompressed', async () => {
    const testDir = path.join(__dirname, 'test-dir');
    const outputFile = path.join(__dirname, 'output.tar');

    // Setup: Create test directory and file
    await fs.promises.mkdir(testDir, { recursive: true });
    const testFile = path.join(testDir, 'test.txt');
    await fs.promises.writeFile(testFile, 'test content');

    // Test: Create uncompressed tar
    await ZipAFolder.tar(testDir, outputFile, { compression: COMPRESSION_LEVEL.uncompressed });

    // Verify: Check if the tar file was created and is a valid tar archive
    const fileExists = await fs.promises.access(outputFile)
      .then(() => true)
      .catch(() => false);
    expect(fileExists).toBe(true);

    // Verify the archive is not gzipped by checking magic bytes
    const fileContent = await fs.promises.readFile(outputFile);
    const isGzipped = fileContent[0] === 0x1f && fileContent[1] === 0x8b;
    expect(isGzipped).toBe(false);

    // Cleanup
    await fs.promises.rm(testDir, { recursive: true, force: true });
    await fs.promises.rm(outputFile, { force: true });
  });
});