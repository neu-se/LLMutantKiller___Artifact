import * as path from 'path';
import * as rimraf from 'rimraf';
import { ZipAFolder as zipafolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testUNCOMPRESSEDTAR = path.resolve(__dirname, 'testUNCOMPRESSED.tar');

    beforeAll(() => {
        rimraf.sync('test/*.tgz');
        rimraf.sync('test/*.tar');
    });

    it('TGZ test folder with compression rate', async () => {
        await expect(zipafolder.tar(path.resolve(__dirname, 'data/'), testUNCOMPRESSEDTAR, {
            compression: COMPRESSION_LEVEL.uncompressed,
        })).rejects.toThrow();
    });
});