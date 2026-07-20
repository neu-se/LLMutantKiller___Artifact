import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Zip-A-Folder Test', function () {
    const testTAR = path.resolve(__dirname, 'test.tgz');
    const testUNCOMPRESSEDTAR = path.resolve(__dirname, 'testUNCOMPRESSED.tar');
    const testMEDIUMTAR = path.resolve(__dirname, 'testMEDIUM.tgz');

    beforeAll(() => {
        rimraf.sync('test/*.tgz');
        rimraf.sync('test/*.tar');
    });

    it('Should create a tar file with default compression level when no options are provided', async () => {
        await ZipAFolder.tar(path.resolve(__dirname, 'data/'), testTAR);
        expect(fs.existsSync(testTAR)).toBe(true);
        const stats = fs.statSync(testTAR);
        const size = stats.size;
        await rimraf.sync(testTAR);
        await ZipAFolder.tar(path.resolve(__dirname, 'data/'), testTAR, { compression: COMPRESSION_LEVEL.high });
        const stats2 = fs.statSync(testTAR);
        const size2 = stats2.size;
        expect(size).toBeLessThan(size2);
    });
});