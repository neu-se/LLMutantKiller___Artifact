'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder tar with uncompressed compression level', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const outputFile = path.resolve(__dirname, 'test-uncompressed.tar');
    const compressedOutputFile = path.resolve(__dirname, 'test-compressed.tar');

    beforeAll(async () => {
        await fs.promises.mkdir(testDir, { recursive: true });
        await fs.promises.writeFile(path.join(testDir, 'test.txt'), 'test content');
    });

    afterAll(async () => {
        await fs.promises.rm(outputFile, { force: true });
        await fs.promises.rm(compressedOutputFile, { force: true });
        await fs.promises.rm(testDir, { recursive: true, force: true });
    });

    it('should create different sized archives for uncompressed vs compressed tar', async () => {
        await ZipAFolder.tar(testDir, outputFile, { compression: COMPRESSION_LEVEL.uncompressed });
        await ZipAFolder.tar(testDir, compressedOutputFile, { compression: COMPRESSION_LEVEL.high });

        const uncompressedStats = await fs.promises.stat(outputFile);
        const compressedStats = await fs.promises.stat(compressedOutputFile);

        expect(uncompressedStats.size).toBeGreaterThan(compressedStats.size);
    });
});