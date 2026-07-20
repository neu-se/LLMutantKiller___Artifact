import 'jest-extended';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as path from 'path';
import { COMPRESSION_LEVEL, tar, ZipAFolder as zipafolder } from '../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testTAR = path.resolve(__dirname, 'test.tgz');
    const testUNCOMPRESSEDTAR = path.resolve(__dirname, 'testUNCOMPRESSED.tar');

    beforeAll(() => {
        rimraf.sync('test/*.tgz');
        rimraf.sync('test/*.tar');
    });

    it('should create a tar file with the correct compression level', async () => {
        await zipafolder.tar(path.resolve(__dirname, 'data/'), testTAR, { compression: COMPRESSION_LEVEL.uncompressed });
        const sizeUNCOMPRESSED = fs.statSync(testTAR).size;

        await zipafolder.tar(path.resolve(__dirname, 'data/'), testUNCOMPRESSEDTAR, { compression: COMPRESSION_LEVEL.uncompressed });
        const sizeUNCOMPRESSEDTAR = fs.statSync(testUNCOMPRESSEDTAR).size;

        expect(sizeUNCOMPRESSED).toBeLessThan(sizeUNCOMPRESSEDTAR);
    });
});