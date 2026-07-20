import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('ZipAFolder.tar with uncompressed option', () => {
    it('should create a tar file with uncompressed compression level', async () => {
        const testDir = path.join(os.tmpdir(), 'zip-a-folder-test');
        const srcDir = path.join(testDir, 'src');
        const tarFilePath = path.join(testDir, 'output.tar');

        // Create test directory and file
        await fs.promises.mkdir(srcDir, { recursive: true });
        await fs.promises.writeFile(path.join(srcDir, 'test.txt'), 'test content');

        // Call tar with uncompressed option
        await ZipAFolder.tar(srcDir, tarFilePath, { compression: COMPRESSION_LEVEL.uncompressed });

        // Verify the tar file was created
        const stats = await fs.promises.stat(tarFilePath);
        expect(stats.isFile()).toBe(true);

        // Cleanup
        await fs.promises.rm(testDir, { recursive: true, force: true });
    });
});