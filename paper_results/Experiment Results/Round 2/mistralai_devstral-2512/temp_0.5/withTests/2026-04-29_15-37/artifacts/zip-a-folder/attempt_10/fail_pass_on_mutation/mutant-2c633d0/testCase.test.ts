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

        // Test with explicitly set uncompressed
        const uncompressedPath = path.resolve(__dirname, 'test-uncompressed.zip');
        await ZipAFolder.zip(testFolder, uncompressedPath, {
            compression: COMPRESSION_LEVEL.uncompressed
        });
        const uncompressedSize = fs.statSync(uncompressedPath).size;

        // The default compression should produce a file that is NOT the same size as uncompressed
        // This will fail on the mutated code where compression defaults to undefined (which becomes uncompressed)
        expect(defaultSize).not.toBe(uncompressedSize);

        // Cleanup
        fs.unlinkSync(outputPath);
        fs.unlinkSync(uncompressedPath);
    });
});