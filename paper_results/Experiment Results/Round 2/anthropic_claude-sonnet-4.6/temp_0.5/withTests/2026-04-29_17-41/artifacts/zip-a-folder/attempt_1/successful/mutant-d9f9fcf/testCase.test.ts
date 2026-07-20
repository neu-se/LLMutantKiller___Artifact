'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP uncompressed vs compressed size comparison', () => {
    const testDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test');
    const dataDir = path.resolve(testDir, 'data');
    const uncompressedZip = path.resolve(testDir, 'mutant_test_uncompressed.zip');
    const highZip = path.resolve(testDir, 'mutant_test_high.zip');

    afterAll(() => {
        if (fs.existsSync(uncompressedZip)) fs.unlinkSync(uncompressedZip);
        if (fs.existsSync(highZip)) fs.unlinkSync(highZip);
    });

    it('uncompressed ZIP should be larger than high-compression ZIP', async () => {
        await ZipAFolder.zip(dataDir, uncompressedZip, { compression: COMPRESSION_LEVEL.uncompressed });
        await ZipAFolder.zip(dataDir, highZip, { compression: COMPRESSION_LEVEL.high });

        const sizeUncompressed = fs.statSync(uncompressedZip).size;
        const sizeHigh = fs.statSync(highZip).size;

        // With original code: uncompressed uses store:true so files are stored without compression,
        // making the archive larger than a high-compression zip.
        // With mutated code: uncompressed falls through to the else branch and uses zlib compression,
        // so both archives would be similarly sized (compressed), causing this assertion to fail.
        expect(sizeUncompressed).toBeGreaterThan(sizeHigh);
    });
});