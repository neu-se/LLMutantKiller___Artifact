'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder uncompressed compression test', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const outputPath = path.resolve(__dirname, 'output-uncompressed.zip');

    beforeAll(async () => {
        await fs.promises.mkdir(testDir, { recursive: true });
        await fs.promises.writeFile(path.join(testDir, 'test.txt'), 'test content');
    });

    afterAll(async () => {
        await fs.promises.rm(outputPath, { force: true });
        await fs.promises.rm(testDir, { recursive: true, force: true });
    });

    it('should create an uncompressed zip file when compression level is uncompressed', async () => {
        await zip(testDir, outputPath, { compression: COMPRESSION_LEVEL.uncompressed });

        expect(fs.existsSync(outputPath)).toBe(true);

        const stats = await fs.promises.stat(outputPath);
        expect(stats.size).toBeGreaterThan(0);
    });
});