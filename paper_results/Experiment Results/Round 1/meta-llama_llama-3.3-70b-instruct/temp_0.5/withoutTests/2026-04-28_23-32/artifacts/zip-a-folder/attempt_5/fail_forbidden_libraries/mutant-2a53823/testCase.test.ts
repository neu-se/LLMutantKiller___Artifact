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
        expect(fs.statSync(tarFilePath).size).toBeGreaterThan(0);

        // Check the contents of the tar file
        const archiver = require('archiver');
        const extract = require('extract-zip');
        const tempDir = path.join(tmpdir(), 'temp');
        await extract(tarFilePath, { dir: tempDir });
        expect(fs.existsSync(path.join(tempDir, 'test/test.txt'))).toBe(true);

        // Clean up
        rimraf.sync(path.join(src, 'test.txt'));
        rimraf.sync(src);
        rimraf.sync(tarFilePath);
        rimraf.sync(tempDir);
    });
});