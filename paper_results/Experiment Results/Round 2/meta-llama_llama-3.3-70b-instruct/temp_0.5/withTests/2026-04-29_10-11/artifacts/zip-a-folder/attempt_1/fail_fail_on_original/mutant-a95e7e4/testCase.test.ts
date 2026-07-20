import 'jest-extended';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as path from 'path';
import { zip, ZipAFolder as zipafolder, COMPRESSION_LEVEL } from '../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testUNCOMPRESSEDZIP = path.resolve(__dirname, 'testUNCOMPRESSED.zip');

    beforeAll(() => {
        rimraf.sync('test/*.zip');
    });

    it('Should create a zip file with uncompressed compression level', async () => {
        await zipafolder.zip(path.resolve(__dirname, 'data/'), testUNCOMPRESSEDZIP, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });

        expect(fs.existsSync(testUNCOMPRESSEDZIP)).toBe(true);

        const zipFileStats = fs.statSync(testUNCOMPRESSEDZIP);
        const expectedSize = fs.statSync(path.resolve(__dirname, 'data/')).size;

        // The size of the zip file should be close to the size of the original directory
        expect(zipFileStats.size).toBeGreaterThan(expectedSize * 0.9);
    });
});