'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, zip } from '../lib/ZipAFolder';

describe('ZipAFolder uncompressed zip test', () => {
    it('should create a zip file with uncompressed compression level', async () => {
        const testFolder = path.resolve(__dirname, 'data');
        const outputPath = path.resolve(__dirname, 'test-uncompressed-mutant.zip');

        // Clean up if the file already exists
        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }

        await zip(testFolder, outputPath, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });

        // Verify the file was created
        expect(fs.existsSync(outputPath)).toBe(true);

        // Verify the file has content (is not empty)
        const stats = fs.statSync(outputPath);
        expect(stats.size).toBeGreaterThan(0);

        // Clean up
        fs.unlinkSync(outputPath);
    });
});