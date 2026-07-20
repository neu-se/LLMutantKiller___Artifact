'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder as zipafolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP uncompressed store option mutation test', () => {
    const testUncompressedZIP = path.resolve(__dirname, 'test_mutation_uncompressed.zip');
    const testCompressedZIP = path.resolve(__dirname, 'test_mutation_compressed.zip');
    const dataDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');

    afterAll(() => {
        if (fs.existsSync(testUncompressedZIP)) {
            fs.unlinkSync(testUncompressedZIP);
        }
        if (fs.existsSync(testCompressedZIP)) {
            fs.unlinkSync(testCompressedZIP);
        }
    });

    it('uncompressed ZIP should be larger than high-compression ZIP when store is true', async () => {
        await zipafolder.zip(dataDir, testUncompressedZIP, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });
        await zipafolder.zip(dataDir, testCompressedZIP, {
            compression: COMPRESSION_LEVEL.high,
        });

        const sizeUncompressed = fs.statSync(testUncompressedZIP).size;
        const sizeCompressed = fs.statSync(testCompressedZIP).size;

        // With store: true, uncompressed ZIP stores files as-is, so it should be larger
        // than a high-compression ZIP. With store: false (mutation), the "uncompressed"
        // ZIP would actually apply compression, making it smaller or similar to the compressed one.
        expect(sizeUncompressed).toBeGreaterThan(sizeCompressed);
    });
});