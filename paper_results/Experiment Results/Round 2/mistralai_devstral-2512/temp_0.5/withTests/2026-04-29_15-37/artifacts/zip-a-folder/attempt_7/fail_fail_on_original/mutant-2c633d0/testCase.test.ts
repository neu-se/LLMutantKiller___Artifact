'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder default compression test', () => {
    it('should use high compression when no options are provided', async () => {
        const testFolder = path.resolve(__dirname, '../test/data');
        const outputPath = path.resolve(__dirname, 'test-default.zip');

        // Create test directory and file if they don't exist
        if (!fs.existsSync(testFolder)) {
            fs.mkdirSync(testFolder, { recursive: true });
            fs.writeFileSync(path.join(testFolder, 'test.txt'), 'test content');
        }

        // Test with default compression (should be high)
        await ZipAFolder.zip(testFolder, outputPath);
        const defaultSize = fs.statSync(outputPath).size;

        // Test with explicitly set medium compression
        const mediumPath = path.resolve(__dirname, 'test-medium.zip');
        await ZipAFolder.zip(testFolder, mediumPath, {
            compression: COMPRESSION_LEVEL.medium
        });
        const mediumSize = fs.statSync(mediumPath).size;

        // Test with explicitly set high compression
        const highPath = path.resolve(__dirname, 'test-high.zip');
        await ZipAFolder.zip(testFolder, highPath, {
            compression: COMPRESSION_LEVEL.high
        });
        const highSize = fs.statSync(highPath).size;

        // Default should match high compression
        expect(defaultSize).toBe(highSize);
        // High should be smaller than medium
        expect(highSize).toBeLessThan(mediumSize);

        // Cleanup
        fs.unlinkSync(outputPath);
        fs.unlinkSync(mediumPath);
        fs.unlinkSync(highPath);
    });
});