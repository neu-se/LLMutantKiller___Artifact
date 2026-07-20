import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';
import * as fs from 'fs';
import * as rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should throw an error when compression level is not provided in the mutated code', async () => {
        const src = './test-src';
        const tarFilePath = './test-tar-file.tar';
        const zipAFolderOptions = {};

        fs.mkdirSync(src);
        try {
            await ZipAFolder.tar(src, tarFilePath, zipAFolderOptions);
            throw new Error('Expected an error to be thrown');
        } catch (error) {
            expect(error.message).toBe('You must either provide a target file path or a custom write stream to write to.');
        } finally {
            rimraf.sync(src);
            rimraf.sync(tarFilePath);
        }
    });
});