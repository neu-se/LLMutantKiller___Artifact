import { ZipAFolder, COMPRESSION_LEVEL } from '../lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';

describe('ZipAFolder compression behavior', () => {
    it('should create an uncompressed zip when COMPRESSION_LEVEL.uncompressed is specified', async () => {
        const testFolder = path.resolve(__dirname, 'data');
        const outputPath = path.resolve(__dirname, 'test-uncompressed.zip');

        await ZipAFolder.zip(testFolder, outputPath, {
            compression: COMPRESSION_LEVEL.uncompressed
        });

        expect(fs.existsSync(outputPath)).toBe(true);
        const stats = fs.statSync(outputPath);
        expect(stats.size).toBeGreaterThan(0);
    });
});