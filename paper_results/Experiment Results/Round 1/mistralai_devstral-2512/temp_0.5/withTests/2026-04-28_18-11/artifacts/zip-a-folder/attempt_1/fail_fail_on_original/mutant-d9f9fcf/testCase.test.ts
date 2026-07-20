'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, zip } from '../lib/ZipAFolder';

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

    it('should create an uncompressed zip file with correct size when compression level is uncompressed', async () => {
        await zip(testDir, outputPath, { compression: COMPRESSION_LEVEL.uncompressed });

        expect(fs.existsSync(outputPath)).toBe(true);

        const stats = await fs.promises.stat(outputPath);
        const fileSize = stats.size;

        // The uncompressed zip should be larger than a compressed one
        // We'll create a compressed version for comparison
        const compressedPath = path.resolve(__dirname, 'output-compressed.zip');
        await zip(testDir, compressedPath, { compression: COMPRESSION_LEVEL.high });

        const compressedStats = await fs.promises.stat(compressedPath);
        const compressedSize = compressedStats.size;

        // Clean up compressed file
        await fs.promises.rm(compressedPath);

        // The uncompressed file should be significantly larger than the compressed one
        expect(fileSize).toBeGreaterThan(compressedSize * 1.5);
    });
});