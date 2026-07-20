import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('ZipAFolder compression behavior', () => {
    it('should create an uncompressed zip when COMPRESSION_LEVEL.uncompressed is specified', async () => {
        const testFolder = path.resolve(__dirname, 'data');
        const outputPath = path.resolve(__dirname, 'test-uncompressed.zip');

        try {
            await ZipAFolder.zip(testFolder, outputPath, {
                compression: COMPRESSION_LEVEL.uncompressed
            });

            expect(fs.existsSync(outputPath)).toBe(true);
            const stats = fs.statSync(outputPath);
            expect(stats.size).toBeGreaterThan(0);
        } finally {
            if (fs.existsSync(outputPath)) {
                rimraf.sync(outputPath);
            }
        }
    });
});