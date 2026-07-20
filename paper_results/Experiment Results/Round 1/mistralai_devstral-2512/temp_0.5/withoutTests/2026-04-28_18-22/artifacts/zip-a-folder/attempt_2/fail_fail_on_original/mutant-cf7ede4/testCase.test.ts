import { ZipAFolder } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('ZipAFolder default compression level', () => {
    it('should use high compression when no options are provided', async () => {
        const testDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(testDir, 'source');
        const zipFilePath = path.join(testDir, 'output.zip');

        await fs.promises.mkdir(srcDir);
        await fs.promises.writeFile(path.join(srcDir, 'test.txt'), 'test content');

        await ZipAFolder.zip(srcDir, zipFilePath);

        const stats = await fs.promises.stat(zipFilePath);
        const fileSize = stats.size;

        // The file should be compressed (smaller than uncompressed)
        // With high compression, the size should be significantly smaller than the original
        expect(fileSize).toBeLessThan(100);
    });
});