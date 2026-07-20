import { ZipAFolder } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('ZipAFolder.tar compression level', () => {
    it('should use high compression by default when no options are provided', async () => {
        const testDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'zip-a-folder-test-'));
        const srcDir = path.join(testDir, 'source');
        const outputFile = path.join(testDir, 'output.tar.gz');
        const testContent = 'a'.repeat(1000000);

        await fs.promises.mkdir(srcDir);
        await fs.promises.writeFile(path.join(srcDir, 'test.txt'), testContent);

        try {
            await ZipAFolder.tar(srcDir, outputFile);

            const stats = await fs.promises.stat(outputFile);
            // With high compression (level 9), we expect significant compression
            // With no compression (default when mutated), the file will be much larger
            // This threshold is specifically chosen to detect the compression level difference
            expect(stats.size).toBeLessThan(testContent.length * 0.01);
        } finally {
            await fs.promises.rm(testDir, { recursive: true, force: true });
        }
    });
});