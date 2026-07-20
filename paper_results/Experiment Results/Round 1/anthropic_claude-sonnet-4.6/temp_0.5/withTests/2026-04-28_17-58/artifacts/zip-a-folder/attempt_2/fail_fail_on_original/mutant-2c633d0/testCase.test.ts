'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder as zipafolder } from '../../../../../../../../../../../../lib/ZipAFolder.ts';

describe('tar default compression level mutation test', () => {
    const testDir = path.resolve(__dirname, '../../../../../../../../../../../../test/data/');
    const testTARDefault = path.resolve(__dirname, '../../../../../../../../../../../../test/test_default_mut.tgz');
    const testTARHigh = path.resolve(__dirname, '../../../../../../../../../../../../test/test_high_mut.tgz');

    beforeAll(async () => {
        if (fs.existsSync(testTARDefault)) fs.unlinkSync(testTARDefault);
        if (fs.existsSync(testTARHigh)) fs.unlinkSync(testTARHigh);
    });

    afterAll(() => {
        if (fs.existsSync(testTARDefault)) fs.unlinkSync(testTARDefault);
        if (fs.existsSync(testTARHigh)) fs.unlinkSync(testTARHigh);
    });

    it('tar without options should produce the same file size as tar with explicit high compression', async () => {
        await zipafolder.tar(testDir, testTARDefault);
        await zipafolder.tar(testDir, testTARHigh, { compression: COMPRESSION_LEVEL.high });

        expect(fs.existsSync(testTARDefault)).toBe(true);
        expect(fs.existsSync(testTARHigh)).toBe(true);

        const sizeDefault = fs.statSync(testTARDefault).size;
        const sizeHigh = fs.statSync(testTARHigh).size;

        // Original: both use level 9 → same size
        // Mutated: default uses undefined level (zlib default ~6) → larger file
        expect(sizeDefault).toBe(sizeHigh);
    });
});