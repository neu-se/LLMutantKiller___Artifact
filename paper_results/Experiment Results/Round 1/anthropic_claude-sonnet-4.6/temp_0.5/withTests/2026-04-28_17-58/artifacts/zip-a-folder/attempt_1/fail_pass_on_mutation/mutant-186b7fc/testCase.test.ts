import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('tar uncompressed mutation detection', () => {
    it('should produce a larger file when using COMPRESSION_LEVEL.uncompressed compared to compressed tar', async () => {
        const testDataDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');
        const uncompressedTar = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/mutant_test_uncompressed.tar');
        const compressedTar = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/mutant_test_compressed.tgz');

        // Clean up before test
        if (fs.existsSync(uncompressedTar)) fs.unlinkSync(uncompressedTar);
        if (fs.existsSync(compressedTar)) fs.unlinkSync(compressedTar);

        await ZipAFolder.tar(testDataDir, uncompressedTar, { compression: COMPRESSION_LEVEL.uncompressed });
        await ZipAFolder.tar(testDataDir, compressedTar, { compression: COMPRESSION_LEVEL.high });

        expect(fs.existsSync(uncompressedTar)).toBe(true);
        expect(fs.existsSync(compressedTar)).toBe(true);

        const sizeUncompressed = fs.statSync(uncompressedTar).size;
        const sizeCompressed = fs.statSync(compressedTar).size;

        // An uncompressed tar should be larger than a gzip-compressed tar
        expect(sizeUncompressed).toBeGreaterThan(sizeCompressed);

        // Clean up after test
        if (fs.existsSync(uncompressedTar)) fs.unlinkSync(uncompressedTar);
        if (fs.existsSync(compressedTar)) fs.unlinkSync(compressedTar);
    });
});