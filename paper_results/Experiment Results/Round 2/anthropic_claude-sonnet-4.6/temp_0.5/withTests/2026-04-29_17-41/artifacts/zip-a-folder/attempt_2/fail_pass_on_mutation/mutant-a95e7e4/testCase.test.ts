import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP uncompressed store behavior', () => {
    const testUncompressedZip = path.resolve(__dirname, 'test_store_behavior.zip');
    const testHighZip = path.resolve(__dirname, 'test_high_behavior.zip');
    const dataDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');

    afterAll(() => {
        if (fs.existsSync(testUncompressedZip)) fs.unlinkSync(testUncompressedZip);
        if (fs.existsSync(testHighZip)) fs.unlinkSync(testHighZip);
    });

    it('uncompressed zip (store:true) should be strictly larger than high compression zip', async () => {
        await ZipAFolder.zip(dataDir, testUncompressedZip, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });
        await ZipAFolder.zip(dataDir, testHighZip, {
            compression: COMPRESSION_LEVEL.high,
        });

        const sizeUncompressed = fs.statSync(testUncompressedZip).size;
        const sizeHigh = fs.statSync(testHighZip).size;

        // With store:true (original), uncompressed > high compression
        // With mutation (zlib level:0 instead of store:true), both use deflate so sizes differ less
        // The uncompressed (store) file must be strictly larger than high compression
        expect(sizeUncompressed).toBeGreaterThan(sizeHigh);
    });
});