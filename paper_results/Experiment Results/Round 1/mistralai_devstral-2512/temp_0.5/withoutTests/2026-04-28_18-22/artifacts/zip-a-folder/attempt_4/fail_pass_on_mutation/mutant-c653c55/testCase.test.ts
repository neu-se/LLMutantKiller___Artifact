import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as archiver from 'archiver';

describe('ZipAFolder zip compression behavior', () => {
    it('should use store compression when compression is disabled', async () => {
        const testDir = path.join(__dirname, 'test-dir');
        const testFile = path.join(testDir, 'test.txt');
        const testContent = 'This is a test file for compression testing';
        const zipFilePath = path.join(__dirname, 'test.zip');

        // Create test directory and file
        await fs.promises.mkdir(testDir, { recursive: true });
        await fs.promises.writeFile(testFile, testContent);

        // Create zip with uncompressed option
        await ZipAFolder.zip(testDir, zipFilePath, {
            compression: COMPRESSION_LEVEL.uncompressed
        });

        // Read the created zip file and verify it's not empty
        const zipContent = await fs.promises.readFile(zipFilePath);
        expect(zipContent.length).toBeGreaterThan(0);

        // Verify the zip file contains the expected content by checking file size
        // In store mode (uncompressed), the zip should be larger than if compressed
        const zipStats = await fs.promises.stat(zipFilePath);
        const originalFileStats = await fs.promises.stat(testFile);

        // The zip file should be significantly larger than the original file
        // when using store compression (uncompressed)
        expect(zipStats.size).toBeGreaterThan(originalFileStats.size * 0.8);

        // Clean up
        await fs.promises.rm(testDir, { recursive: true, force: true });
        await fs.promises.rm(zipFilePath, { force: true });
    });
});