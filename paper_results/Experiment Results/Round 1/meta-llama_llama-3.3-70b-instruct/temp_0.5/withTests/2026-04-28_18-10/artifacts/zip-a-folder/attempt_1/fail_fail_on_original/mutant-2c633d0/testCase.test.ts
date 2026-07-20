import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as path from 'path';

describe('Zip-A-Folder Test', function () {
    it('Should throw an error when no compression level is provided', async () => {
        await expect(ZipAFolder.tar(path.resolve(__dirname, 'data/'), 'test.tgz')).rejects.toThrow(
            /You must either provide a target file path or a custom write stream to write to./
        );
    });
});