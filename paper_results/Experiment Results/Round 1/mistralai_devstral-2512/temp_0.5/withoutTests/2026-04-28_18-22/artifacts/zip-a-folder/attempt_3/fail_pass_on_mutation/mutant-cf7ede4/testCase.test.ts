import { ZipAFolder } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('ZipAFolder default compression behavior', () => {
    it('should use high compression level by default when no options are provided', async () => {
        const testDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(testDir, 'source');
        const zipFilePath = path.join(testDir, 'output.zip');

        await fs.promises.mkdir(srcDir);
        const testContent = 'a'.repeat(1000); // Create larger content to see compression difference
        await fs.promises.writeFile(path.join(srcDir, 'test.txt'), testContent);

        // Create a reference file with uncompressed zip
        const uncompressedZipPath = path.join(testDir, 'uncompressed.zip');
        await ZipAFolder.zip(srcDir, uncompressedZipPath, { compression: 0 });

        // Create the default compressed zip
        await ZipAFolder.zip(srcDir, zipFilePath);

        const uncompressedStats = await fs.promises.stat(uncompressedZipPath);
        const compressedStats = await fs.promises.stat(zipFilePath);

        // The default compressed version should be significantly smaller than uncompressed
        expect(compressedStats.size).toBeLessThan(uncompressedStats.size * 0.8);
    });
});