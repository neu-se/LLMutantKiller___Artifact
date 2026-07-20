import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('ZipAFolder.tar', () => {
    it('should use high compression by default when no options are provided', async () => {
        const testDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'zip-a-folder-test-'));
        const srcDir = path.join(testDir, 'source');
        const outputFile = path.join(testDir, 'output.tar.gz');
        const testContent = 'test'.repeat(10000);

        await fs.promises.mkdir(srcDir);
        await fs.promises.writeFile(path.join(srcDir, 'test.txt'), testContent);

        try {
            await ZipAFolder.tar(srcDir, outputFile);

            const stats = await fs.promises.stat(outputFile);
            expect(stats.size).toBeLessThan(testContent.length * 0.3);
        } finally {
            await fs.promises.rm(testDir, { recursive: true, force: true });
        }
    });
});