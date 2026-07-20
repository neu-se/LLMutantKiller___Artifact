import 'jest-extended';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as path from 'path';
import { zip, COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testUNCOMPRESSEDZIP = path.resolve(__dirname, 'testUNCOMPRESSED.zip');

    beforeAll(() => {
        rimraf.sync('test/*.zip');
    });

    it('Should create a zip file with uncompressed compression level', async () => {
        await ZipAFolder.zip(path.resolve(__dirname, 'data/'), testUNCOMPRESSEDZIP, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });

        const stats = fs.statSync(testUNCOMPRESSEDZIP);
        expect(stats.size).toBeGreaterThan(0);
    });
});