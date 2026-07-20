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

        // Mock the compress method to capture archiver options
        const originalCompress = ZipAFolder['compress'];
        let capturedArchiverOptions: any = null;

        // @ts-ignore - Accessing private method for testing
        ZipAFolder['compress'] = async function(options: any) {
            capturedArchiverOptions = options.archiverOptions;
            return originalCompress.call(this, options);
        };

        try {
            // Create zip with uncompressed option
            await ZipAFolder.zip(testDir, zipFilePath, {
                compression: COMPRESSION_LEVEL.uncompressed
            });

            // Verify the archiver options contain store: true
            expect(capturedArchiverOptions).toBeDefined();
            expect(capturedArchiverOptions).toHaveProperty('store');
            expect(capturedArchiverOptions.store).toBe(true);

        } finally {
            // Restore original method
            ZipAFolder['compress'] = originalCompress;

            // Clean up
            await fs.promises.rm(testDir, { recursive: true, force: true });
            await fs.promises.rm(zipFilePath, { force: true });
        }
    });
});