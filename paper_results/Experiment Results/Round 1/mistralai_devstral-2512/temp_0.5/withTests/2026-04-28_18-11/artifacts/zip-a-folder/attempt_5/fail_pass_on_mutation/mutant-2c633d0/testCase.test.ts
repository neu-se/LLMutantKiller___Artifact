import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder default compression test', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const outputPath = path.resolve(__dirname, 'output.zip');
    const uncompressedOutputPath = path.resolve(__dirname, 'output-uncompressed.zip');

    beforeAll(() => {
        // Create test directory and files
        fs.mkdirSync(testDir, { recursive: true });
        fs.writeFileSync(path.join(testDir, 'file1.txt'), 'content1'.repeat(1000));
        fs.writeFileSync(path.join(testDir, 'file2.txt'), 'content2'.repeat(1000));
    });

    afterAll(() => {
        // Clean up
        rimraf.sync(testDir);
        rimraf.sync(outputPath);
        rimraf.sync(uncompressedOutputPath);
    });

    it('should use high compression by default when no options are provided', async () => {
        // Create a zip with default compression (should be high)
        await ZipAFolder.zip(testDir, outputPath);

        // Create a zip with explicitly set uncompressed compression
        await ZipAFolder.zip(testDir, uncompressedOutputPath, {
            compression: COMPRESSION_LEVEL.uncompressed
        });

        // Get file sizes
        const defaultSize = fs.statSync(outputPath).size;
        const uncompressedSize = fs.statSync(uncompressedOutputPath).size;

        // The default compression should produce a significantly smaller file than uncompressed
        // Using a larger threshold to account for compression variations
        expect(defaultSize).toBeLessThan(uncompressedSize * 0.8);
    });
});