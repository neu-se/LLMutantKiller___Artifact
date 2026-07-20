import fs from 'fs';
import path from 'path';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';
import rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should create a tar archive with the correct compression level when compression is set to uncompressed', async () => {
        const src = 'src';
        const tarFilePath = 'tarFile.tar';
        const compressionLevel = COMPRESSION_LEVEL.uncompressed;

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

        // Check the size of the tar file
        const stats = fs.statSync(tarFilePath);
        expect(stats.size).toBeGreaterThan(0);

        // Check the contents of the tar file
        const tarFileBuffer = fs.readFileSync(tarFilePath);
        expect(tarFileBuffer).toContain(fileContent);

        // Clean up
        rimraf.sync(tempDir);
        fs.unlinkSync(tarFilePath);
    });
});