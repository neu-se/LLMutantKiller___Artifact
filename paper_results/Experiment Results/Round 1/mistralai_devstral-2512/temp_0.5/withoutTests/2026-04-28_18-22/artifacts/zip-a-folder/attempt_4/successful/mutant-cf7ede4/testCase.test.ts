import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('ZipAFolder compression level default', () => {
    it('should use high compression (level 9) by default when no options are provided', async () => {
        const testDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(testDir, 'source');
        const zipFilePath = path.join(testDir, 'output.zip');

        await fs.promises.mkdir(srcDir);
        const testContent = 'a'.repeat(10000); // Large enough content to see compression differences
        await fs.promises.writeFile(path.join(srcDir, 'test.txt'), testContent);

        // Create zip with default options
        await ZipAFolder.zip(srcDir, zipFilePath);

        // Create zip with explicitly set high compression
        const highCompressionPath = path.join(testDir, 'high-compression.zip');
        await ZipAFolder.zip(srcDir, highCompressionPath, { compression: COMPRESSION_LEVEL.high });

        const defaultStats = await fs.promises.stat(zipFilePath);
        const highStats = await fs.promises.stat(highCompressionPath);

        // The default should produce the same size as explicitly setting high compression
        expect(defaultStats.size).toBe(highStats.size);
    });
});