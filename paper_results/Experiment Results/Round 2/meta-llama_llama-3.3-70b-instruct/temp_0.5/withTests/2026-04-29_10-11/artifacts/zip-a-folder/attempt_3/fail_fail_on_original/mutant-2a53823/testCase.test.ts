import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { ZipAFolder as zipafolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testTAR = path.resolve(__dirname, 'test.tgz');
    const testUNCOMPRESSEDTAR = path.resolve(__dirname, 'testUNCOMPRESSED.tar');

    beforeAll(() => {
        rimraf.sync('test/*.tgz');
        rimraf.sync('test/*.tar');
    });

    it('TGZ test folder with compression rate', async () => {
        await zipafolder.tar(path.resolve(__dirname, 'data/'), testUNCOMPRESSEDTAR, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });
        expect(fs.existsSync(testUNCOMPRESSEDTAR)).toBe(true);
        const stats = fs.statSync(testUNCOMPRESSEDTAR);
        expect(stats.size).toBeGreaterThan(0);
    });
});