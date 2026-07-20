'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder compression options test', () => {
    it('should use high compression when options are undefined', async () => {
        const testFolder = path.resolve(__dirname, '../test/data');
        const outputPath = path.resolve(__dirname, 'test-default.zip');

        // Create a test file to ensure the folder exists
        const testFile = path.join(testFolder, 'test.txt');
        if (!fs.existsSync(testFolder)) {
            fs.mkdirSync(testFolder, { recursive: true });
        }
        fs.writeFileSync(testFile, 'test content');

        await ZipAFolder.zip(testFolder, outputPath);

        const stats = fs.statSync(outputPath);
        const defaultSize = stats.size;

        // Compare with uncompressed version
        const uncompressedPath = path.resolve(__dirname, 'test-uncompressed.zip');
        await ZipAFolder.zip(testFolder, uncompressedPath, {
            compression: COMPRESSION_LEVEL.uncompressed
        });

        const uncompressedStats = fs.statSync(uncompressedPath);
        const uncompressedSize = uncompressedStats.size;

        expect(defaultSize).toBeLessThan(uncompressedSize);

        // Cleanup
        fs.unlinkSync(outputPath);
        fs.unlinkSync(uncompressedPath);
        fs.unlinkSync(testFile);
        fs.rmdirSync(testFolder);
    });
});