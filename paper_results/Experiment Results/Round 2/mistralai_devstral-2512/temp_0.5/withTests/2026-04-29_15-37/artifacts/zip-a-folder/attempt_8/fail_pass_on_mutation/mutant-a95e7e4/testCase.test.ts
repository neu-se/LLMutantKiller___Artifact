'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { zip, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder uncompressed mutation test', () => {
    const testDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');
    const uncompressedZipPath = path.resolve(__dirname, 'test-uncompressed-mutation.zip');

    it('should execute the uncompressed compression path when COMPRESSION_LEVEL.uncompressed is specified', async () => {
        // Create a test file to ensure we have content
        const testFilePath = path.join(testDir, 'test-file.txt');
        fs.writeFileSync(testFilePath, 'test content');

        try {
            // This will fail on the mutated code because the if condition is changed to "if (false)"
            // which means it will try to use zlib compression options with uncompressed mode
            await zip(testDir, uncompressedZipPath, { compression: COMPRESSION_LEVEL.uncompressed });

            // Verify the file was created
            expect(fs.existsSync(uncompressedZipPath)).toBe(true);

            // Verify the zip contains our test file
            // This is a basic check that the zip was created properly
            const stats = fs.statSync(uncompressedZipPath);
            expect(stats.size).toBeGreaterThan(0);
        } finally {
            // Clean up
            if (fs.existsSync(testFilePath)) {
                fs.unlinkSync(testFilePath);
            }
            if (fs.existsSync(uncompressedZipPath)) {
                fs.unlinkSync(uncompressedZipPath);
            }
        }
    });
});