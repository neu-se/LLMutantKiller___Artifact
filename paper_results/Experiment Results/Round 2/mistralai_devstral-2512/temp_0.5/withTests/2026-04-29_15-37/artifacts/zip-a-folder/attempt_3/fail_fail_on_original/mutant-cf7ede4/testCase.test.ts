import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder default compression test', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const outputPath = path.resolve(__dirname, 'output.zip');
    const testFile = path.join(testDir, 'test.txt');

    beforeAll(async () => {
        await fs.promises.mkdir(testDir, { recursive: true });
        await fs.promises.writeFile(testFile, 'test content');
    });

    afterAll(async () => {
        await rimraf.sync(testDir);
        if (fs.existsSync(outputPath)) {
            await fs.promises.unlink(outputPath);
        }
    });

    it('should use high compression by default when no options are provided', async () => {
        await ZipAFolder.zip(testDir, outputPath);
        const stats = await fs.promises.stat(outputPath);
        const fileSize = stats.size;

        // Create a reference with uncompressed compression
        const uncompressedPath = path.resolve(__dirname, 'output-uncompressed.zip');
        await ZipAFolder.zip(testDir, uncompressedPath, { compression: COMPRESSION_LEVEL.uncompressed });
        const uncompressedStats = await fs.promises.stat(uncompressedPath);
        const uncompressedSize = uncompressedStats.size;

        // The default compressed file should be smaller than the uncompressed one
        expect(fileSize).toBeLessThan(uncompressedSize);

        // Clean up
        await fs.promises.unlink(uncompressedPath);
    });
});