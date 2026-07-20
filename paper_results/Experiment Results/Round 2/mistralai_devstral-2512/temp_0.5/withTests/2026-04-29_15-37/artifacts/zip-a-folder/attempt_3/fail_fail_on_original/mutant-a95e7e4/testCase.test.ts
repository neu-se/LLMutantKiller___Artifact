'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { zip, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder uncompressed mutation test', () => {
    const testDir = path.resolve(__dirname, '../subject_repositories/zip-a-folder/test/data');
    const uncompressedZipPath = path.resolve(__dirname, 'test-uncompressed-mutation.zip');

    it('should create an uncompressed zip file when compression level is set to uncompressed', async () => {
        await zip(testDir, uncompressedZipPath, { compression: COMPRESSION_LEVEL.uncompressed });

        const stats = fs.statSync(uncompressedZipPath);
        expect(stats.size).toBeGreaterThan(0);

        // Clean up
        fs.unlinkSync(uncompressedZipPath);
    });
});