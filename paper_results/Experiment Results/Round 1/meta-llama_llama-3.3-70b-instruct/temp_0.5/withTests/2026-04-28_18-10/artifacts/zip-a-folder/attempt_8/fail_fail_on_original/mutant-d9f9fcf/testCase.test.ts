import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as zlib from 'zlib';

describe('Zip-A-Folder Test', function () {
    const testUNCOMPRESSEDZIP = path.resolve(__dirname, 'testUNCOMPRESSED.zip');
    const testFolder = path.resolve(__dirname, 'testFolder');
    const testFile = path.resolve(testFolder, 'testFile.txt');

    beforeAll(() => {
        rimraf.sync('test/*.zip');
        fs.mkdirSync(testFolder, { recursive: true });
        fs.writeFileSync(testFile, 'Hello World!');
    });

    afterAll(() => {
        rimraf.sync(testFolder);
        rimraf.sync('test/*.zip');
    });

    it('should create an uncompressed zip file when compression is set to uncompressed', async () => {
        await zip(testFolder, testUNCOMPRESSEDZIP, {
            compression: 0,
        });

        const zipBuffer = fs.readFileSync(testUNCOMPRESSEDZIP);
        try {
            zlib.deflateSync(zipBuffer);
            throw new Error('Expected an error when trying to deflate an already compressed zip file');
        } catch (error) {
            expect(error.message).toContain('incorrect header check');
        }
    });
});