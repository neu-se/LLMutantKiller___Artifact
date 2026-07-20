'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder } from '../lib/ZipAFolder';

describe('TAR uncompressed compression level', () => {
    const testUncompressedTAR = path.resolve(__dirname, '../test/testMutantUncompressed.tar');

    beforeAll(() => {
        rimraf.sync(testUncompressedTAR);
    });

    afterAll(() => {
        rimraf.sync(testUncompressedTAR);
    });

    it('should create a tar file when compression level is uncompressed', async () => {
        const srcDir = path.resolve(__dirname, '../test/data');

        await ZipAFolder.tar(srcDir, testUncompressedTAR, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });

        expect(fs.existsSync(testUncompressedTAR)).toBe(true);
        const stats = fs.statSync(testUncompressedTAR);
        expect(stats.size).toBeGreaterThan(0);
    });
});