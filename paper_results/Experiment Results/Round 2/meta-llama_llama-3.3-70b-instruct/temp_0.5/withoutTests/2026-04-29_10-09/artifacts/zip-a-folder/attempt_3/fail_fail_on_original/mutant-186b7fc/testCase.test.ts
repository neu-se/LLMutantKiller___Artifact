import fs from 'fs';
import path from 'path';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../lib/ZipAFolder.ts';
import rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should create a tar archive when compression is set to uncompressed', async () => {
        const src = './testDir';
        const tarFilePath = 'tarFile.tar.gz';
        const compressionLevel = COMPRESSION_LEVEL.uncompressed;

        // Create a temporary directory for testing
        fs.mkdirSync(src);

        // Create a file in the temporary directory
        const fileContent = 'Hello, World!';
        fs.writeFileSync(path.join(src, 'file.txt'), fileContent);

        // Set up the test
        const zipAFolderOptions: ZipAFolder.ZipAFolderOptions = {
            compression: compressionLevel,
        };

        // Run the test
        await expect(ZipAFolder.tar(src, tarFilePath, zipAFolderOptions)).rejects.toThrowError('You must either provide a target file path or a custom write stream to write to.');

        // Clean up
        rimraf.sync(src);
    });
});