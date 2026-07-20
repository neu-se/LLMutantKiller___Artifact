import 'jest-extended';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as path from 'path';
import { COMPRESSION_LEVEL, tar, ZipAFolder as zipafolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testTAR = path.resolve(__dirname, 'test.tgz');
    const testUNCOMPRESSEDTAR = path.resolve(__dirname, 'testUNCOMPRESSED.tar');

    beforeAll(() => {
        rimraf.sync('test/*.tgz');
        rimraf.sync('test/*.tar');
    });

    it('TGZ test folder with compression level set to uncompressed should create a tar file', async () => {
        await zipafolder.tar(path.resolve(__dirname, './'), testUNCOMPRESSEDTAR, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });
        expect(fs.existsSync(testUNCOMPRESSEDTAR)).toBe(true);
    });
});