'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder as zipafolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP uncompressed vs compressed size comparison', () => {
    const testDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test');
    const testUNCOMPRESSEDZIP = path.resolve(testDir, 'mutant_testUNCOMPRESSED.zip');
    const testCOMPRESSEDZIP = path.resolve(testDir, 'mutant_testCOMPRESSED.zip');
    const dataDir = path.resolve(testDir, 'data');

    afterAll(() => {
        rimraf.sync(testUNCOMPRESSEDZIP);
        rimraf.sync(testCOMPRESSEDZIP);
    });

    it('uncompressed ZIP should be larger than high-compression ZIP', async () => {
        await zipafolder.zip(dataDir, testUNCOMPRESSEDZIP, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });
        await zipafolder.zip(dataDir, testCOMPRESSEDZIP, {
            compression: COMPRESSION_LEVEL.high,
        });

        const sizeUNCOMPRESSED = fs.statSync(testUNCOMPRESSEDZIP).size;
        const sizeCOMPRESSED = fs.statSync(testCOMPRESSEDZIP).size;

        // An uncompressed (stored) zip must be larger than a compressed zip
        // With store:true, files are stored as-is; without it, they get deflated
        expect(sizeUNCOMPRESSED).toBeGreaterThan(sizeCOMPRESSED);
    });
});