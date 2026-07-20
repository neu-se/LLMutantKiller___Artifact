'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder uncompressed zip test', () => {
    const testOutputPath = path.resolve(__dirname, 'test-uncompressed.zip');
    const testDataPath = path.resolve(__dirname, '../subject_repositories/zip-a-folder/test/data');

    beforeAll(() => {
        rimraf.sync(testOutputPath);
    });

    afterAll(() => {
        rimraf.sync(testOutputPath);
    });

    it('should create an uncompressed zip file with store method', async () => {
        await ZipAFolder.zip(testDataPath, testOutputPath, {
            compression: COMPRESSION_LEVEL.uncompressed
        });

        expect(fs.existsSync(testOutputPath)).toBe(true);

        const stats = fs.statSync(testOutputPath);
        expect(stats.size).toBeGreaterThan(0);
    });
});