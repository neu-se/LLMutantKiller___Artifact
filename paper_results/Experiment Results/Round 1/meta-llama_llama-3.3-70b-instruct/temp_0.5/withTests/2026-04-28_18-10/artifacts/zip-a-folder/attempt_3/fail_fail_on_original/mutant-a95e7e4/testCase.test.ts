import {COMPRESSION_LEVEL, ZipAFolder as zipafolder} from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as path from 'path';

describe('Zip-A-Folder Test', function () {
    const testUNCOMPRESSEDZIP = path.resolve(__dirname, 'testUNCOMPRESSED.zip');
    const testZIP = path.resolve(__dirname, 'test.zip');
    const testFolder = path.resolve(__dirname, 'testFolder');

    beforeAll(() => {
        rimraf.sync('test/*.tgz');
        rimraf.sync('test/*.tar');
        rimraf.sync('test/*.zip');
        fs.mkdirSync(testFolder);
    });

    afterAll(() => {
        rimraf.sync(testFolder);
        rimraf.sync('test/*.tgz');
        rimraf.sync('test/*.tar');
        rimraf.sync('test/*.zip');
    });

    it('should create an uncompressed zip file when compression level is set to uncompressed', async () => {
        await zipafolder.zip(testFolder, testUNCOMPRESSEDZIP, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });
        await zipafolder.zip(testFolder, testZIP);
        const statsUncompressed = fs.statSync(testUNCOMPRESSEDZIP);
        const statsCompressed = fs.statSync(testZIP);
        expect(statsUncompressed.size).toBeGreaterThan(statsCompressed.size);
    });
});