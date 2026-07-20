import 'jest-extended';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as path from 'path';
import {COMPRESSION_LEVEL, ZipAFolder as zipafolder} from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testUNCOMPRESSEDZIP = path.resolve(__dirname, 'testUNCOMPRESSED.zip');
    const testDir = path.resolve(__dirname, 'testDir');

    beforeAll(() => {
        rimraf.sync('test/*.zip');
        fs.mkdirSync(testDir);
        fs.writeFileSync(path.resolve(testDir, 'test.txt'), 'test');
    });

    afterAll(() => {
        rimraf.sync('test/*.zip');
        rimraf.sync(testDir);
    });

    it('ZIP test folder with uncompressed compression should not use zlib compression', async () => {
        await zipafolder.zip(testDir, testUNCOMPRESSEDZIP, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });

        const zipBuffer = fs.readFileSync(testUNCOMPRESSEDZIP);
        expect(zipBuffer.toString('hex')).not.toContain('789c');
    });
});