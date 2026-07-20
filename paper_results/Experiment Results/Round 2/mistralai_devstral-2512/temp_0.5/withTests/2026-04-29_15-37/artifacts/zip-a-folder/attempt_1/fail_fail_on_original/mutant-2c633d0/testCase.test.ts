'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder default compression test', () => {
    it('should use high compression by default when no options are provided', async () => {
        const testFolder = path.resolve(__dirname, 'data');
        const outputPath = path.resolve(__dirname, 'test-default-compression.zip');

        await ZipAFolder.zip(testFolder, outputPath);

        const stats = fs.statSync(outputPath);
        const fileSize = stats.size;

        await ZipAFolder.zip(testFolder, path.resolve(__dirname, 'test-uncompressed.zip'), {
            compression: COMPRESSION_LEVEL.uncompressed
        });

        const uncompressedStats = fs.statSync(path.resolve(__dirname, 'test-uncompressed.zip'));
        const uncompressedSize = uncompressedStats.size;

        expect(fileSize).toBeLessThan(uncompressedSize);
    });
});