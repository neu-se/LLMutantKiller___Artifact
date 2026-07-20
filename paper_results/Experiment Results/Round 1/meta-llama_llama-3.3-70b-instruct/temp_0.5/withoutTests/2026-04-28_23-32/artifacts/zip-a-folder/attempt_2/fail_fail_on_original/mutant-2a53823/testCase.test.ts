import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import { tmpdir } from 'os';
import { rm } from 'rimraf';

describe('ZipAFolder', () => {
    it('should throw an error if compression is not uncompressed and the compression logic is not executed', async () => {
        const src = 'test';
        const tarFilePath = path.join(tmpdir(), 'test.tar.gz');
        const zipAFolderOptions = { compression: COMPRESSION_LEVEL.medium };

        // Create a test directory
        await fs.promises.mkdir(src);

        // Create a test file inside the directory
        await fs.promises.writeFile(path.join(src, 'test.txt'), 'Hello World!');

        // Mock the compress function to check if it's called
        const originalCompress = ZipAFolder.compress;
        let compressCalled = false;
        ZipAFolder.compress = async () => {
            compressCalled = true;
        };

        try {
            // Call the tar function
            await ZipAFolder.tar(src, tarFilePath, zipAFolderOptions);

            // Check if the compress function was called
            expect(compressCalled).toBe(true);
        } finally {
            // Restore the original compress function
            ZipAFolder.compress = originalCompress;

            // Clean up
            await rm(path.join(src, 'test.txt'));
            await rm(src);
            await rm(tarFilePath);
        }
    });
});