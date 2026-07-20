import fs from 'fs';
import path from 'path';
import { ZipAFolder } from '../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';
import rimraf from 'rimraf';
import { jest } from '@jest/globals';

describe('ZipAFolder', () => {
    it('should create a tar archive with the correct compression level when compression is set to uncompressed', async () => {
        const src = 'src';
        const tarFilePath = 'tarFile.tar.gz';
        const compressionLevel = ZipAFolder.COMPRESSION_LEVEL.uncompressed;

        // Create a temporary directory for testing
        const tempDir = 'tempDir';
        fs.mkdirSync(tempDir);

        // Create a file in the temporary directory
        const fileContent = 'Hello, World!';
        fs.writeFileSync(path.join(tempDir, 'file.txt'), fileContent);

        // Set up the test
        const zipAFolderOptions: ZipAFolder.ZipAFolderOptions = {
            compression: compressionLevel,
        };

        // Run the test
        await ZipAFolder.tar(tempDir, tarFilePath, zipAFolderOptions);

        // Check if the tar file was created
        expect(fs.existsSync(tarFilePath)).toBe(true);

        // Check the compression level of the tar file
        const tarFileBuffer = fs.readFileSync(tarFilePath);
        const isGzipped = tarFileBuffer.toString('utf8', 0, 2) === '\x1f\x8b';
        expect(isGzipped).toBe(false);

        // Clean up
        rimraf.sync(tempDir);
        fs.unlinkSync(tarFilePath);
    });
});