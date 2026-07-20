import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Zip-A-Folder Test', function () {
    const testZIP = path.resolve(__dirname, 'test.zip');
    const testFolder = path.resolve(__dirname, 'data/');

    beforeAll(() => {
        rimraf.sync('test/*.tgz');
        rimraf.sync('test/*.tar');
        rimraf.sync('test/*.zip');
    });

    it('Should create a zip file with default compression level when no options are provided', async () => {
        await zip(testFolder, testZIP);
        const stats = fs.statSync(testZIP);
        expect(stats.size).toBeGreaterThan(0);
    });
});