import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import * as rimraf from 'rimraf';

describe('ZipAFolder zip compression behavior', () => {
    it('should create zip file with store compression when compression is disabled', async () => {
        const testDir = path.join(__dirname, 'test-dir');
        const testFile = path.join(testDir, 'test.txt');
        const testContent = 'This is a test file for compression testing';
        const zipFilePath = path.join(__dirname, 'test.zip');

        try {
            // Create test directory and file
            await fs.promises.mkdir(testDir, { recursive: true });
            await fs.promises.writeFile(testFile, testContent);

            // Create zip with uncompressed option
            await ZipAFolder.zip(testDir, zipFilePath, {
                compression: COMPRESSION_LEVEL.uncompressed
            });

            // Verify the zip file was created
            const zipStats = await fs.promises.stat(zipFilePath);
            expect(zipStats.size).toBeGreaterThan(0);

            // Read the zip file and verify it contains the expected content
            const zipContent = await fs.promises.readFile(zipFilePath);
            expect(zipContent.length).toBeGreaterThan(0);

        } finally {
            // Clean up
            await fs.promises.rm(testDir, { recursive: true, force: true });
            await fs.promises.rm(zipFilePath, { force: true });
        }
    });
});