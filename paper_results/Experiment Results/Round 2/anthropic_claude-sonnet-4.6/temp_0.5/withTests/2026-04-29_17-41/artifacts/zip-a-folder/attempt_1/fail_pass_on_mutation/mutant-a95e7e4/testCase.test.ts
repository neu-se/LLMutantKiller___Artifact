import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP uncompressed vs compressed size comparison', () => {
    const testUncompressedZip = path.resolve(__dirname, 'test_uncompressed_mutant.zip');
    const testCompressedZip = path.resolve(__dirname, 'test_compressed_mutant.zip');
    const dataDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');

    afterAll(() => {
        if (fs.existsSync(testUncompressedZip)) fs.unlinkSync(testUncompressedZip);
        if (fs.existsSync(testCompressedZip)) fs.unlinkSync(testCompressedZip);
    });

    it('uncompressed zip should be larger than high-compression zip', async () => {
        await ZipAFolder.zip(dataDir, testUncompressedZip, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });
        await ZipAFolder.zip(dataDir, testCompressedZip, {
            compression: COMPRESSION_LEVEL.high,
        });

        const sizeUncompressed = fs.statSync(testUncompressedZip).size;
        const sizeCompressed = fs.statSync(testCompressedZip).size;

        // An uncompressed zip (store: true) should be larger than a compressed zip
        // The mutation changes `if (o.compression === COMPRESSION_LEVEL.uncompressed)` to `if (false)`,
        // so the uncompressed path is never taken, making both zips use compression,
        // causing sizeUncompressed to be similar to or smaller than sizeCompressed
        expect(sizeUncompressed).toBeGreaterThan(sizeCompressed);
    });
});