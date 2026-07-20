import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Zip-A-Folder Test', function () {
    const testUNCOMPRESSEDZIP = path.resolve(__dirname, 'testUNCOMPRESSED.zip');
    const testFolder = path.resolve(__dirname, 'testFolder');

    beforeAll(() => {
        rimraf.sync('test/*.zip');
        fs.mkdirSync(testFolder, { recursive: true });
    });

    afterAll(() => {
        rimraf.sync(testFolder);
        rimraf.sync('test/*.zip');
    });

    it('should create an uncompressed zip file when compression is set to uncompressed', async () => {
        await zip(testFolder, testUNCOMPRESSEDZIP, {
            compression: 0,
        });

        expect(fs.existsSync(testUNCOMPRESSEDZIP)).toBe(true);
    });
});