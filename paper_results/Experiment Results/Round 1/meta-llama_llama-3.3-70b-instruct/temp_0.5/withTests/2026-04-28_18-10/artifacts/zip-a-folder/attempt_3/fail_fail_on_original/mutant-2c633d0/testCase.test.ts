import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Zip-A-Folder Test', function () {
    const testTAR = path.resolve(__dirname, 'test.tgz');

    beforeAll(() => {
        rimraf.sync('test/*.tgz');
    });

    it('Should create a tar file with default compression level when no options are provided', async () => {
        await ZipAFolder.tar(path.resolve(__dirname, './data/'), testTAR);
        expect(fs.existsSync(testTAR)).toBe(true);
    });
});