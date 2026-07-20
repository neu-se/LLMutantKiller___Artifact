'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder default compression test', () => {
    const testFolder = path.resolve(__dirname, 'data');
    const outputPath = path.resolve(__dirname, 'test-default-compression.zip');
    const uncompressedOutputPath = path.resolve(__dirname, 'test-uncompressed.zip');

    beforeAll(() => {
        rimraf.sync(path.resolve(__dirname, '*.zip'));
    });

    it('should use high compression by default when no options are provided', async () => {
        await ZipAFolder.zip(testFolder, outputPath);
        await ZipAFolder.zip(testFolder, uncompressedOutputPath, {
            compression: COMPRESSION_LEVEL.uncompressed
        });

        const defaultStats = fs.statSync(outputPath);
        const uncompressedStats = fs.statSync(uncompressedOutputPath);

        expect(defaultStats.size).toBeLessThan(uncompressedStats.size);
    });
});