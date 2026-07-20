import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as archiver from 'archiver';

describe('ZipAFolder zip compression options', () => {
    it('should use store compression when compression is disabled', async () => {
        const testDir = path.join(__dirname, 'test-dir');
        const testFile = path.join(testDir, 'test.txt');
        const testContent = 'This is a test file for compression testing';
        const zipFilePath = path.join(__dirname, 'test.zip');

        try {
            // Create test directory and file
            await fs.promises.mkdir(testDir, { recursive: true });
            await fs.promises.writeFile(testFile, testContent);

            // Spy on archiver to check if store option is set
            const archiverSpy = jest.spyOn(archiver, 'zip');
            let capturedOptions: any = null;

            archiverSpy.mockImplementation((options) => {
                capturedOptions = options;
                return archiver('zip', options);
            });

            // Create zip with uncompressed option
            await ZipAFolder.zip(testDir, zipFilePath, {
                compression: COMPRESSION_LEVEL.uncompressed
            });

            // Verify store option was set in archiver options
            expect(capturedOptions).toBeDefined();
            expect(capturedOptions.store).toBe(true);

        } finally {
            // Clean up
            await fs.promises.rm(testDir, { recursive: true, force: true });
            await fs.promises.rm(zipFilePath, { force: true });
            jest.restoreAllMocks();
        }
    });
});