import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as zlib from 'zlib';
import { promisify } from 'util';

const gunzip = promisify(zlib.gunzip);

describe('ZipAFolder.tar', () => {
    it('should apply high compression by default when no options are provided', async () => {
        const testDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'zip-a-folder-test-'));
        const srcDir = path.join(testDir, 'source');
        const outputFile = path.join(testDir, 'output.tar.gz');
        const testContent = 'a'.repeat(100000);

        await fs.promises.mkdir(srcDir);
        await fs.promises.writeFile(path.join(srcDir, 'test.txt'), testContent);

        try {
            await ZipAFolder.tar(srcDir, outputFile);

            const compressedData = await fs.promises.readFile(outputFile);
            const decompressedData = await gunzip(compressedData);

            const compressedSize = compressedData.length;
            const originalSize = testContent.length;
            const compressionRatio = compressedSize / originalSize;

            expect(compressionRatio).toBeLessThan(0.1);
        } finally {
            await fs.promises.rm(testDir, { recursive: true, force: true });
        }
    });
});