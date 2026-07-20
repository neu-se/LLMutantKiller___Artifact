'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { zip, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder uncompressed mutation test', () => {
    const testDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');
    const uncompressedZipPath = path.resolve(__dirname, 'test-uncompressed-mutation.zip');

    it('should correctly handle uncompressed compression level', async () => {
        // This test specifically targets the mutant by verifying the uncompressed path is taken
        // The mutant changes the condition to "if (false)" which would skip uncompressed handling
        await zip(testDir, uncompressedZipPath, { compression: COMPRESSION_LEVEL.uncompressed });

        // Verify file was created
        expect(fs.existsSync(uncompressedZipPath)).toBe(true);

        // Get file size for uncompressed
        const uncompressedSize = fs.statSync(uncompressedZipPath).size;

        // Create a compressed version for comparison
        const compressedZipPath = path.resolve(__dirname, 'test-compressed-mutation.zip');
        await zip(testDir, compressedZipPath, { compression: COMPRESSION_LEVEL.high });
        const compressedSize = fs.statSync(compressedZipPath).size;

        // Uncompressed should be significantly larger than compressed
        expect(uncompressedSize).toBeGreaterThan(compressedSize * 1.5);

        // Clean up
        fs.unlinkSync(uncompressedZipPath);
        fs.unlinkSync(compressedZipPath);
    });
});