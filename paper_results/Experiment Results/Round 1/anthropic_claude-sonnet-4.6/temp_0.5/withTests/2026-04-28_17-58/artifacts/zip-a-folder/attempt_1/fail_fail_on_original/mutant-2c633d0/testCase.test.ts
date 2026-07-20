'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder as zipafolder } from '../lib/ZipAFolder';

describe('tar default compression level', () => {
    const testDir = path.resolve(__dirname, 'data/');
    const testTARDefault = path.resolve(__dirname, 'test_default_compression.tgz');
    const testTARHigh = path.resolve(__dirname, 'test_high_compression.tgz');

    beforeAll(() => {
        rimraf.sync(testTARDefault);
        rimraf.sync(testTARHigh);
    });

    afterAll(() => {
        rimraf.sync(testTARDefault);
        rimraf.sync(testTARHigh);
    });

    it('tar without options should produce the same file size as tar with high compression', async () => {
        // Create tar with no options (should default to COMPRESSION_LEVEL.high)
        await zipafolder.tar(testDir, testTARDefault);
        // Create tar with explicit high compression
        await zipafolder.tar(testDir, testTARHigh, { compression: COMPRESSION_LEVEL.high });

        expect(fs.existsSync(testTARDefault)).toBe(true);
        expect(fs.existsSync(testTARHigh)).toBe(true);

        const sizeDefault = fs.statSync(testTARDefault).size;
        const sizeHigh = fs.statSync(testTARHigh).size;

        // In original code, both use level 9, so sizes should be equal.
        // In mutated code, default uses undefined level (zlib default ~6), 
        // which produces a larger file than explicit level 9.
        expect(sizeDefault).toBe(sizeHigh);
    });
});