import 'jest-extended';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder as zipafolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testTAR = path.resolve(__dirname, 'test.tgz');
    const testUNCOMPRESSEDTAR = path.resolve(__dirname, 'testUNCOMPRESSED.tar');

    beforeAll(() => {
        rimraf.sync('test/*.tar');
        rimraf.sync('test/*.tgz');
        fs.mkdirSync('data', { recursive: true });
        fs.mkdirSync(path.dirname(testUNCOMPRESSEDTAR), { recursive: true });
        fs.mkdirSync(path.dirname(testTAR), { recursive: true });
    });

    afterAll(() => {
        rimraf.sync('data');
        rimraf.sync('test/*.tar');
        rimraf.sync('test/*.tgz');
    });

    it('TGZ test folder with compression level set to uncompressed should create a tar file', async () => {
        await expect(zipafolder.tar(path.resolve(__dirname, 'data'), testUNCOMPRESSEDTAR, {
            compression: COMPRESSION_LEVEL.uncompressed,
        })).resolves.not.toThrow();
        await expect(zipafolder.tar(path.resolve(__dirname, 'data'), testTAR)).resolves.not.toThrow();
        expect(fs.existsSync(testUNCOMPRESSEDTAR)).toBe(true);
        expect(fs.existsSync(testTAR)).toBe(true);
    });
});