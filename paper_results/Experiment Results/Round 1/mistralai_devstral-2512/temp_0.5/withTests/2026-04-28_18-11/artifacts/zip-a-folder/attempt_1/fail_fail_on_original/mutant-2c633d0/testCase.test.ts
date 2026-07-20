import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder default compression test', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const outputPath = path.resolve(__dirname, 'output.zip');
    const mediumOutputPath = path.resolve(__dirname, 'output-medium.zip');

    beforeAll(() => {
        // Create test directory and files
        fs.mkdirSync(testDir, { recursive: true });
        fs.writeFileSync(path.join(testDir, 'file1.txt'), 'content1');
        fs.writeFileSync(path.join(testDir, 'file2.txt'), 'content2');
    });

    afterAll(() => {
        // Clean up
        rimraf.sync(testDir);
        rimraf.sync(outputPath);
        rimraf.sync(mediumOutputPath);
    });

    it('should use high compression by default', async () => {
        // Create a zip with default compression
        await ZipAFolder.zip(testDir, outputPath);

        // Create a zip with medium compression for comparison
        await ZipAFolder.zip(testDir, mediumOutputPath, {
            compression: COMPRESSION_LEVEL.medium
        });

        // Get file sizes
        const defaultSize = fs.statSync(outputPath).size;
        const mediumSize = fs.statSync(mediumOutputPath).size;

        // The default compression should produce smaller files than medium compression
        expect(defaultSize).toBeLessThan(mediumSize);
    });
});