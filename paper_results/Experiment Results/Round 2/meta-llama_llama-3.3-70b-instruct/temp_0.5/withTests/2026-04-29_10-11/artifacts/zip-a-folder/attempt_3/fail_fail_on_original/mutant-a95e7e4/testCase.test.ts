import 'jest-extended';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as path from 'path';
import { ZipAFolder, COMPRESSION_LEVEL } from '../lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testUNCOMPRESSEDZIP = path.resolve(__dirname, 'testUNCOMPRESSED.zip');
    const testZIP = path.resolve(__dirname, 'test.zip');

    beforeAll(() => {
        rimraf.sync('test/*.zip');
    });

    it('Should create a zip file with different sizes for compressed and uncompressed compression levels', async () => {
        await ZipAFolder.zip(path.resolve(__dirname, 'data/'), testUNCOMPRESSEDZIP, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });

        await ZipAFolder.zip(path.resolve(__dirname, 'data/'), testZIP);

        expect(fs.existsSync(testUNCOMPRESSEDZIP)).toBe(true);
        expect(fs.existsSync(testZIP)).toBe(true);

        const zipFileSize = fs.statSync(testZIP).size;
        const uncompressedZipFileSize = fs.statSync(testUNCOMPRESSEDZIP).size;

        expect(uncompressedZipFileSize).toBeGreaterThan(zipFileSize);
    });
});