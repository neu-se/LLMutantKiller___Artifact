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
        expect(size).toBeGreaterThan(100);

        // Check the contents of the tar file by trying to untar it
        const untarDir = path.join(tmpdir(), 'untar');
        await fs.promises.mkdir(untarDir);
        const childProcess = require('child_process');
        try {
            childProcess.execSync(`tar -xvf ${tarFilePath} -C ${untarDir}`);
            expect(fs.existsSync(path.join(untarDir, 'test/test.txt'))).toBe(true);
        } catch (e) {
            throw new Error('Failed to untar the tar file');
        }

        // Clean up
        rimraf.sync(path.join(src, 'test.txt'));
        rimraf.sync(src);
        rimraf.sync(tarFilePath);
        rimraf.sync(untarDir);
    });
});