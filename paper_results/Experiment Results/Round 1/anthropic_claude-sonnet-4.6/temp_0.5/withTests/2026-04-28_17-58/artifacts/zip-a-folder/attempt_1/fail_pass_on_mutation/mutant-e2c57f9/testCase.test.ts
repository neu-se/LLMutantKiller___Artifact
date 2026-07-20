'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP uncompressed store option mutation test', () => {
    const testDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test');
    const dataDir = path.resolve(testDir, 'data');
    const uncompressedZip = path.resolve(testDir, 'mutant_test_uncompressed.zip');
    const compressedZip = path.resolve(testDir, 'mutant_test_compressed.zip');

    afterAll(() => {
        if (fs.existsSync(uncompressedZip)) fs.unlinkSync(uncompressedZip);
        if (fs.existsSync(compressedZip)) fs.unlinkSync(compressedZip);
    });

    it('uncompressed ZIP (store:true) should be larger than high-compression ZIP', async () => {
        await ZipAFolder.zip(dataDir, uncompressedZip, { compression: COMPRESSION_LEVEL.uncompressed });
        await ZipAFolder.zip(dataDir, compressedZip, { compression: COMPRESSION_LEVEL.high });

        expect(fs.existsSync(uncompressedZip)).toBe(true);
        expect(fs.existsSync(compressedZip)).toBe(true);

        const sizeUncompressed = fs.statSync(uncompressedZip).size;
        const sizeCompressed = fs.statSync(compressedZip).size;

        // With store:true (original), uncompressed ZIP stores files as-is, making it larger than compressed
        // With store:false (mutant), both ZIPs apply compression, so sizes would be similar or equal
        expect(sizeUncompressed).toBeGreaterThan(sizeCompressed);
    });
});