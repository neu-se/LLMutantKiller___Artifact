'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder uncompressed zip behavior', () => {
    it('should create a zip file when compression level is uncompressed', async () => {
        const testOutputPath = path.resolve(__dirname, 'test_uncompressed_output.zip');

        // Clean up before test
        if (fs.existsSync(testOutputPath)) {
            fs.unlinkSync(testOutputPath);
        }

        try {
            const dataDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');
            await ZipAFolder.zip(dataDir, testOutputPath, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });

            // The file should exist after zipping with uncompressed level
            expect(fs.existsSync(testOutputPath)).toBe(true);
            // The file should have non-zero size
            const stats = fs.statSync(testOutputPath);
            expect(stats.size).toBeGreaterThan(0);
        } finally {
            // Clean up after test
            if (fs.existsSync(testOutputPath)) {
                fs.unlinkSync(testOutputPath);
            }
        }
    });
});