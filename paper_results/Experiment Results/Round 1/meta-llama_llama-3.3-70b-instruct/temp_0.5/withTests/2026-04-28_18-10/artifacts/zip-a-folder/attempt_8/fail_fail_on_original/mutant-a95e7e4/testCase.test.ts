import {COMPRESSION_LEVEL, ZipAFolder as zipafolder} from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as path from 'path';

describe('Zip-A-Folder Test', function () {
    const testUNCOMPRESSEDZIP = path.resolve(__dirname, 'testUNCOMPRESSED.zip');
    const testFolder = path.resolve(__dirname, 'testFolder');

    beforeAll(() => {
        rimraf.sync('test/*.tgz');
        rimraf.sync('test/*.tar');
        rimraf.sync('test/*.zip');
        fs.mkdirSync(testFolder);
        fs.writeFileSync(path.join(testFolder, 'file1.txt'), 'Hello World!');
        fs.writeFileSync(path.join(testFolder, 'file2.txt'), 'Hello World!');
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
        const statsUncompressed = fs.statSync(testUNCOMPRESSEDZIP);
        const fileBuffer = fs.readFileSync(testUNcompressedZIP);
        let isStoreMethodUsed = false;
        for (let i = 0; i < fileBuffer.length; i++) {
            if (fileBuffer[i] === 0x00 && fileBuffer[i + 1] === 0x00) {
                isStoreMethodUsed = true;
                break;
            }
        }
        expect(isStoreMethodUsed).toBe(true);
    });
});