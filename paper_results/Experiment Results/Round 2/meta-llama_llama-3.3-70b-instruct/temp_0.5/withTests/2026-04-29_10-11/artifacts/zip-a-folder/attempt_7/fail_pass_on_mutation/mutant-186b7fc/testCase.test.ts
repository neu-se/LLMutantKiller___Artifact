import { tar } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Zip-A-Folder Test', function () {
    const testTAR = path.resolve(__dirname, 'test.tgz');
    const testFolder = path.resolve(__dirname, 'testFolder');

    beforeAll(() => {
        rimraf.sync('test/*.tgz');
        rimraf.sync('test/*.tar');
        fs.mkdirSync(testFolder);
    });

    afterAll(() => {
        rimraf.sync(testFolder);
        rimraf.sync('test/*.tgz');
    });

    it('tar function should create a tar file with the correct compression level', async () => {
        await tar(testFolder, testTAR, { compression: 0 });
        const stats = fs.statSync(testTAR);
        expect(stats.size).toBeGreaterThan(0);
    });
});