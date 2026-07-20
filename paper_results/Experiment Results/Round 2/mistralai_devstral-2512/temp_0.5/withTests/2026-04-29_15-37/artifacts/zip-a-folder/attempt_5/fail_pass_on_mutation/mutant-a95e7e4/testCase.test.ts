'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { zip, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder uncompressed mutation test', () => {
    const testDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');
    const uncompressedZipPath = path.resolve(__dirname, 'test-uncompressed-mutation.zip');
    const mediumZipPath = path.resolve(__dirname, 'test-medium-mutation.zip');

    it('should create different sized files for uncompressed vs medium compression', async () => {
        // Create uncompressed zip
        await zip(testDir, uncompressedZipPath, { compression: COMPRESSION_LEVEL.uncompressed });
        const uncompressedStats = fs.statSync(uncompressedZipPath);

        // Create medium compressed zip
        await zip(testDir, mediumZipPath, { compression: COMPRESSION_LEVEL.medium });
        const mediumStats = fs.statSync(mediumZipPath);

        // Uncompressed should be larger than medium compression
        expect(uncompressedStats.size).toBeGreaterThan(mediumStats.size);

        // Clean up
        fs.unlinkSync(uncompressedZipPath);
        fs.unlinkSync(mediumZipPath);
    });
});