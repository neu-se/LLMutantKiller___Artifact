import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Zip-A-Folder Test', function () {
    const testTAR = path.resolve(__dirname, 'test.tgz');

    beforeAll(() => {
        rimraf.sync('test/*.tgz');
        fs.mkdirSync(path.resolve(__dirname, './data/'), { recursive: true });
    });

    afterAll(() => {
        rimraf.sync('test/*.tgz');
        rimraf.sync(path.resolve(__dirname, './data/'));
    });

    it('Should throw an error when no compression level is provided and no default compression level is set', async () => {
        await expect(ZipAFolder.tar(path.resolve(__dirname, './data/'), testTAR, {})).rejects.toThrow();
    });
});