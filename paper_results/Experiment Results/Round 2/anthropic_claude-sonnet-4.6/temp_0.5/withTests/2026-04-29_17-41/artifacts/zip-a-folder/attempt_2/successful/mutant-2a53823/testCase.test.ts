'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('TAR uncompressed compression level', () => {
    const testUncompressedTAR = path.resolve(
        __dirname,
        '../../../../../../../../../../../subject_repositories/zip-a-folder/test/testMutantUncompressed.tar'
    );

    beforeAll(() => {
        if (fs.existsSync(testUncompressedTAR)) {
            fs.unlinkSync(testUncompressedTAR);
        }
    });

    afterAll(() => {
        if (fs.existsSync(testUncompressedTAR)) {
            fs.unlinkSync(testUncompressedTAR);
        }
    });

    it('should create a tar file when compression level is uncompressed', async () => {
        const srcDir = path.resolve(
            __dirname,
            '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data'
        );

        await ZipAFolder.tar(srcDir, testUncompressedTAR, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });

        expect(fs.existsSync(testUncompressedTAR)).toBe(true);
        const stats = fs.statSync(testUncompressedTAR);
        expect(stats.size).toBeGreaterThan(0);
    });
});