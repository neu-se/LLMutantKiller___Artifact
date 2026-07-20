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

    it('Should create a tar file with default compression level when no options are provided', async () => {
        await ZipAFolder.tar(path.resolve(__dirname, './data/'), testTAR, undefined);
        const stats = fs.statSync(testTAR);
        const size = stats.size;
        await fs.promises.unlink(testTAR);
        await ZipAFolder.tar(path.resolve(__dirname, './data/'), testTAR, { compression: 9 });
        const stats2 = fs.statSync(testTAR);
        const size2 = stats2.size;
        expect(size).toBeLessThan(size2);
    });
});