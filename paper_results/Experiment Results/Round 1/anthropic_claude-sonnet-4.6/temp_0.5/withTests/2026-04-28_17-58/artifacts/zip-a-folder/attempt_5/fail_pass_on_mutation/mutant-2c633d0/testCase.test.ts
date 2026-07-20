'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder as zipafolder } from '../../../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('tar default compression level mutation test', () => {
    const testDir = path.resolve(__dirname, '../../../../../../../../../../../../../subject_repositories/zip-a-folder/test/data/');
    const testTARDefault = path.resolve(__dirname, '../../../../../../../../../../../../../subject_repositories/zip-a-folder/test/test_default_nomut.tgz');
    const testTARUncompressed = path.resolve(__dirname, '../../../../../../../../../../../../../subject_repositories/zip-a-folder/test/test_uncompressed_nomut.tar');

    beforeAll(async () => {
        if (fs.existsSync(testTARDefault)) fs.unlinkSync(testTARDefault);
        if (fs.existsSync(testTARUncompressed)) fs.unlinkSync(testTARUncompressed);
    });

    afterAll(() => {
        if (fs.existsSync(testTARDefault)) fs.unlinkSync(testTARDefault);
        if (fs.existsSync(testTARUncompressed)) fs.unlinkSync(testTARUncompressed);
    });

    it('tar without options should produce a smaller file than uncompressed tar, matching high compression behavior', async () => {
        // No options - original defaults to high (9), mutated defaults to undefined
        await zipafolder.tar(testDir, testTARDefault);
        // Explicit uncompressed
        await zipafolder.tar(testDir, testTARUncompressed, { compression: COMPRESSION_LEVEL.uncompressed });

        const sizeDefault = fs.statSync(testTARDefault).size;
        const sizeUncompressed = fs.statSync(testTARUncompressed).size;

        // In original: default is high compression (level 9), so sizeDefault < sizeUncompressed
        // In mutated: default compression is undefined, gzip still runs but with default level
        // Both should still be compressed... need a different signal

        // Check gzip magic bytes: 0x1f 0x8b
        const bufDefault = Buffer.alloc(2);
        const fdDefault = fs.openSync(testTARDefault, 'r');
        fs.readSync(fdDefault, bufDefault, 0, 2, 0);
        fs.closeSync(fdDefault);

        // Original: compression defaults to COMPRESSION_LEVEL.high (9), gzip branch taken → gzip magic bytes present
        // Mutated: compression is undefined, undefined !== 0 so gzip branch still taken → also has gzip magic bytes
        // This won't work either...

        // The real difference: with original, sizeDefault should equal size of explicit high compression
        const testTARExplicitHigh = path.resolve(__dirname, '../../../../../../../../../../../../../subject_repositories/zip-a-folder/test/test_explicit_high_nomut.tgz');
        if (fs.existsSync(testTARExplicitHigh)) fs.unlinkSync(testTARExplicitHigh);
        await zipafolder.tar(testDir, testTARExplicitHigh, { compression: COMPRESSION_LEVEL.high });
        const sizeExplicitHigh = fs.statSync(testTARExplicitHigh).size;
        fs.unlinkSync(testTARExplicitHigh);

        // Original: sizeDefault === sizeExplicitHigh (both level 9)
        // Mutated: sizeDefault !== sizeExplicitHigh (undefined vs level 9)
        expect(sizeDefault).toBe(sizeExplicitHigh);
    });
});