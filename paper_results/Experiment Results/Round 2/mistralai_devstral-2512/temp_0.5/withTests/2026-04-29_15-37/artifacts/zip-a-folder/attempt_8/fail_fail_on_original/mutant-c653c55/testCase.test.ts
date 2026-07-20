'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as archiver from 'archiver';
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
        // Create test file with known content
        const testFilePath = path.resolve(__dirname, 'test-file.txt');
        fs.writeFileSync(testFilePath, 'a'.repeat(10000));
        const originalSize = fs.statSync(testFilePath).size;

        await ZipAFolder.zip(testFilePath, testOutputPath, {
            compression: COMPRESSION_LEVEL.uncompressed
        });

        expect(fs.existsSync(testOutputPath)).toBe(true);

        const zipSize = fs.statSync(testOutputPath).size;
        // With store method, the zip should be only slightly larger than the original
        // (just zip headers added)
        const sizeRatio = zipSize / originalSize;
        expect(sizeRatio).toBeLessThan(1.1); // Should be very close to 1:1 ratio
        expect(sizeRatio).toBeGreaterThan(1.0); // Must be larger than original due to zip headers

        rimraf.sync(testFilePath);
    });
});