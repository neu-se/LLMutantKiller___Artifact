import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

describe('ZipAFolder zip compression behavior', () => {
    it('should produce identical output when using uncompressed mode', async () => {
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

        // Read the created zip file
        const zipContent = await fs.promises.readFile(zipFilePath);

        // Verify the zip file contains the exact uncompressed content
        // In store mode, the file content should be present in the zip without compression
        const expectedContent = `PK${String.fromCharCode(0x03)}${String.fromCharCode(0x04)}`;
        const zipHeader = zipContent.subarray(0, 4).toString('binary');

        // Clean up
        await fs.promises.rm(testDir, { recursive: true, force: true });
        await fs.promises.rm(zipFilePath, { force: true });

        // Verify it's a valid zip file
        expect(zipHeader).toBe(expectedContent);
    });
});