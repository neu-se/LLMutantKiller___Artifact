import 'jest-extended';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as path from 'path';
import {COMPRESSION_LEVEL, ZipAFolder as zipafolder} from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testUNCOMPRESSEDZIP = path.resolve(__dirname, 'testUNCOMPRESSED.zip');
    const testCOMPRESSEDZIP = path.resolve(__dirname, 'testCOMPRESSED.zip');

    beforeAll(() => {
        rimraf.sync('test/*.zip');
    });

    it('ZIP test folder with uncompressed and compressed compression should create zip files of different sizes', async () => {
        await zipafolder.zip(path.resolve(__dirname, 'data/'), testUNCOMPRESSEDZIP, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });
        await zipafolder.zip(path.resolve(__dirname, 'data/'), testCOMPRESSEDZIP);

        const sizeUNCOMPRESSED = fs.statSync(testUNCOMPRESSEDZIP).size;
        const sizeCOMPRESSED = fs.statSync(testCOMPRESSEDZIP).size;
        expect(sizeUNCOMPRESSED).toBeGreaterThan(sizeCOMPRESSED);
    });
});