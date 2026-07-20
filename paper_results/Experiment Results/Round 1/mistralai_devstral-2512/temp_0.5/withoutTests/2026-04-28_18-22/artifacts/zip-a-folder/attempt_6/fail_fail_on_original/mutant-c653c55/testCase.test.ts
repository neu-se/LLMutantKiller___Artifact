import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as archiver from 'archiver';

describe('ZipAFolder zip compression options', () => {
    it('should pass correct archiver options when compression is disabled', async () => {
        const testDir = path.join(__dirname, 'test-dir');
        const testFile = path.join(testDir, 'test.txt');
        const testContent = 'This is a test file for compression testing';
        const zipFilePath = path.join(__dirname, 'test.zip');

        // Create test directory and file
        await fs.promises.mkdir(testDir, { recursive: true });
        await fs.promises.writeFile(testFile, testContent);

        // Mock the archiver module to capture the options
        const originalZip = archiver.zip;
        let capturedOptions: archiver.ArchiverOptions | undefined;

        // @ts-ignore - We're mocking the archiver.zip function
        archiver.zip = function(options?: archiver.ArchiverOptions) {
            capturedOptions = options;
            return originalZip.call(this, options);
        };

        try {
            // Create zip with uncompressed option
            await ZipAFolder.zip(testDir, zipFilePath, {
                compression: COMPRESSION_LEVEL.uncompressed
            });

            // Verify the archiver was called with store: true option
            expect(capturedOptions).toBeDefined();
            expect(capturedOptions?.store).toBe(true);

        } finally {
            // Restore original function
            archiver.zip = originalZip;

            // Clean up
            await fs.promises.rm(testDir, { recursive: true, force: true });
            await fs.promises.rm(zipFilePath, { force: true });
        }
    });
});