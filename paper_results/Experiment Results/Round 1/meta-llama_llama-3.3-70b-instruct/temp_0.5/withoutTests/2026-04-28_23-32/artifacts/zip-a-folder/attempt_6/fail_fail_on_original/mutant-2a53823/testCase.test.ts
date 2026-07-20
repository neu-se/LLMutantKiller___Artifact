import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import { tmpdir } from 'os';
import * as rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should create a tar archive with compression when compression level is not uncompressed', async () => {
        const src = 'test';
        const tarFilePath = path.join(tmpdir(), 'test.tar.gz');
        const zipAFolderOptions = { compression: COMPRESSION_LEVEL.medium };

        // Create a test directory
        if (!fs.existsSync(src)) {
            await fs.promises.mkdir(src);
        }

        // Create a test file inside the directory
        await fs.promises.writeFile(path.join(src, 'test.txt'), 'Hello World!');

        // Call the tar function
        await ZipAFolder.tar(src, tarFilePath, zipAFolderOptions);

        // Check if the tar file exists
        expect(fs.existsSync(tarFilePath)).toBe(true);

        // Check if the tar file has the correct size (not empty)
        const size = fs.statSync(tarFilePath).size;
        expect(size).toBeGreaterThan(0);

        // Check the size of the tar file is greater than the size of an empty tar file
        const emptyTarSize = 1024; // approximate size of an empty tar file
        expect(size).toBeGreaterThan(emptyTarSize);

        // Clean up
        rimraf.sync(path.join(src, 'test.txt'));
        rimraf.sync(src);
        rimraf.sync(tarFilePath);
    });
});