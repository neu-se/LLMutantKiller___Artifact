'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder tar with uncompressed compression level', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const outputFile = path.resolve(__dirname, 'test-uncompressed.tar');

    beforeAll(async () => {
        await fs.promises.mkdir(testDir, { recursive: true });
        await fs.promises.writeFile(path.join(testDir, 'test.txt'), 'test content');
    });

    afterAll(async () => {
        await fs.promises.rm(outputFile, { force: true });
        await fs.promises.rm(testDir, { recursive: true, force: true });
    });

    it('should create an uncompressed tar archive when compression level is set to uncompressed', async () => {
        const result = await ZipAFolder.tar(testDir, outputFile, { compression: COMPRESSION_LEVEL.uncompressed });
        expect(result).toBeUndefined();
        const stats = await fs.promises.stat(outputFile);
        expect(stats.size).toBeGreaterThan(0);

        // Verify the archive is actually uncompressed by checking file signature
        const data = await fs.promises.readFile(outputFile);
        const header = data.subarray(0, 257);
        const isCompressed = header.includes(Buffer.from([0x1f, 0x8b])); // gzip magic number
        expect(isCompressed).toBe(false);
    });
});