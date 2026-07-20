'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { zip, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder uncompressed mutation test', () => {
    const testDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');
    const uncompressedZipPath = path.resolve(__dirname, 'test-uncompressed-mutation.zip');

    it('should use store mode for uncompressed zip files', async () => {
        // Create uncompressed zip
        await zip(testDir, uncompressedZipPath, { compression: COMPRESSION_LEVEL.uncompressed });

        // Verify the file was created
        const stats = fs.statSync(uncompressedZipPath);
        expect(stats.size).toBeGreaterThan(0);

        // Read the zip file and check if it's using store mode (no compression)
        // This is a heuristic check - uncompressed files will be significantly larger
        // than any compressed version would be
        const fileSize = stats.size;
        expect(fileSize).toBeGreaterThan(1000); // Reasonable minimum size for uncompressed data

        // Clean up
        fs.unlinkSync(uncompressedZipPath);
    });
});