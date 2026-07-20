import 'jest-extended';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as path from 'path';
import { tar, ZipAFolder as zipafolder } from '../lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testTAR = path.resolve(__dirname, 'test.tgz');
    const testUNCOMPRESSEDTAR = path.resolve(__dirname, 'testUNCOMPRESSED.tar');

    beforeAll(() => {
        rimraf.sync('test/*.tgz');
        rimraf.sync('test/*.tar');
    });

    it('should throw an error when compression level is not used correctly', async () => {
        await expect(zipafolder.tar(path.resolve(__dirname, 'data/'), testTAR, { compression: 0 })).resolves.not.toThrow();
        await expect(zipafolder.tar(path.resolve(__dirname, 'data/'), testUNCOMPRESSEDTAR, { compression: 0 })).resolves.not.toThrow();
    });
});