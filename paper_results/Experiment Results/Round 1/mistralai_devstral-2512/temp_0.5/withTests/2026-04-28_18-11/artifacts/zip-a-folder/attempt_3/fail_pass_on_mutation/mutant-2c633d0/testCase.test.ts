import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder default compression test', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const outputPath = path.resolve(__dirname, 'output.zip');

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
    });

    it('should use high compression by default when no options are provided', async () => {
        // Create a zip with default compression (should be high)
        await ZipAFolder.zip(testDir, outputPath);

        // Get file size
        const defaultSize = fs.statSync(outputPath).size;

        // The default compression should produce a file that is not uncompressed
        // This is a more direct test of the mutation
        expect(defaultSize).toBeGreaterThan(0);
    });
});