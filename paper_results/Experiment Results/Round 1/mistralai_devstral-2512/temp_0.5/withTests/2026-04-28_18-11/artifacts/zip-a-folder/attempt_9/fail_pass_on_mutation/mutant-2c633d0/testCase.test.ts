import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder default compression test', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const outputPath = path.resolve(__dirname, 'output.zip');
    const uncompressedOutputPath = path.resolve(__dirname, 'output-uncompressed.zip');

    beforeAll(() => {
        // Create test directory with highly compressible content
        fs.mkdirSync(testDir, { recursive: true });
        fs.writeFileSync(path.join(testDir, 'file1.txt'), 'a'.repeat(1000000));
        fs.writeFileSync(path.join(testDir, 'file2.txt'), 'b'.repeat(1000000));
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

        // With highly compressible content, the default (high) compression should be much smaller
        // This will fail on mutated code where default becomes uncompressed
        expect(defaultSize).toBeLessThan(uncompressedSize * 0.05);
    });
});