import 'jest-extended';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder as zipafolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testUNCOMPRESSEDTAR = path.resolve(__dirname, 'testUNCOMPRESSED.tar');

    beforeAll(() => {
        rimraf.sync('test/*.tar');
        fs.mkdirSync('data', { recursive: true });
    });

    afterAll(() => {
        rimraf.sync('data');
    });

    it('TGZ test folder with compression level set to uncompressed should create a tar file', async () => {
        await zipafolder.tar(path.resolve(__dirname, 'data'), testUNCOMPRESSEDTAR, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });
        expect(fs.existsSync(testUNCOMPRESSEDTAR)).toBe(true);
    });
});