'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { zip, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder uncompressed mutation test', () => {
    const testDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');
    const uncompressedZipPath = path.resolve(__dirname, 'test-uncompressed-mutation.zip');

    it('should correctly handle uncompressed compression level by using store mode', async () => {
        // The mutation changes the condition from checking compression level to always false
        // This test verifies that when uncompressed is requested, the store mode is actually used
        // by checking that the zip file is created without compression

        await zip(testDir, uncompressedZipPath, { compression: COMPRESSION_LEVEL.uncompressed });

        // Verify file was created
        expect(fs.existsSync(uncompressedZipPath)).toBe(true);

        // Get size of uncompressed zip
        const uncompressedSize = fs.statSync(uncompressedZipPath).size;

        // Create a compressed version for comparison
        const compressedZipPath = path.resolve(__dirname, 'test-compressed-mutation.zip');
        await zip(testDir, compressedZipPath, { compression: COMPRESSION_LEVEL.high });
        const compressedSize = fs.statSync(compressedZipPath).size;

        // The uncompressed version should be significantly larger
        // This ratio ensures we're testing the actual compression behavior
        expect(uncompressedSize).toBeGreaterThan(compressedSize * 2);

        // Clean up
        fs.unlinkSync(uncompressedZipPath);
        fs.unlinkSync(compressedZipPath);
    });
});