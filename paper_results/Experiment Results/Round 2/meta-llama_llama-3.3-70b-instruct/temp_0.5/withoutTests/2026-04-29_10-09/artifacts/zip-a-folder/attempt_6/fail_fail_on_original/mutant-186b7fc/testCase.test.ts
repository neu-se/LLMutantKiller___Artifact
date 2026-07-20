import fs from 'fs';
import path from 'path';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../lib/ZipAFolder.ts';
import rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should create a tar archive when compression is set to uncompressed', async () => {
        const src = './testDir';
        const tarFilePath = 'tarFile.tar';
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
        await expect(ZipAFolder.tar(src, tarFilePath, zipAFolderOptions)).rejects.not.toThrow();

        // Check if the tar file was created
        expect(fs.existsSync(tarFilePath)).toBe(true);

        // Clean up
        rimraf.sync(src);
        fs.unlinkSync(tarFilePath);
    });
});