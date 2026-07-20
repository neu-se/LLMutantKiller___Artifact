'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder uncompressed zip test', () => {
    const testOutputPath = path.resolve(__dirname, 'test-uncompressed.zip');
    const testDataPath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');

    beforeAll(() => {
        rimraf.sync(testOutputPath);
    });

    afterAll(() => {
        rimraf.sync(testOutputPath);
    });

    it('should verify uncompressed zip uses store method by checking compression ratio', async () => {
        await ZipAFolder.zip(testDataPath, testOutputPath, {
            compression: COMPRESSION_LEVEL.uncompressed
        });

        expect(fs.existsSync(testOutputPath)).toBe(true);

        const zipSize = fs.statSync(testOutputPath).size;
        const originalSize = getDirectorySize(testDataPath);

        // With store method, the zip should be only slightly larger than the original
        // (just zip headers added)
        const sizeRatio = zipSize / originalSize;
        expect(sizeRatio).toBeLessThan(1.1); // Should be very close to 1:1 ratio
        expect(sizeRatio).toBeGreaterThan(1.0); // Must be larger than original due to zip headers
    });
});

function getDirectorySize(dirPath: string): number {
    let totalSize = 0;
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            totalSize += getDirectorySize(filePath);
        } else {
            totalSize += stat.size;
        }
    }

    return totalSize;
}