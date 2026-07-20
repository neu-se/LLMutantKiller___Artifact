import * as fs from 'fs';
import * as path from 'path';
import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as rimraf from 'rimraf';

describe('Zip-A-Folder Test', function () {
    const testZip = path.resolve(__dirname, 'test.zip');
    const testDir = path.resolve(__dirname, 'data');

    beforeAll(() => {
        rimraf.sync(testZip);
        fs.mkdirSync(testDir, { recursive: true });
        fs.writeFileSync(path.join(testDir, 'test.txt'), 'Hello World!');
    });

    afterAll(() => {
        rimraf.sync(testZip);
        rimraf.sync(testDir);
    });

    it('should create a zip file with store: true', async () => {
        await zip(testDir, testZip, { compression: 0 });
        expect(fs.existsSync(testZip)).toBe(true);
        const zipFile = fs.readFileSync(testZip);
        const localHeaderOffset = zipFile.indexOf('test.txt');
        expect(localHeaderOffset).not.toBe(-1);
        const localHeader = zipFile.slice(localHeaderOffset - 30, localHeaderOffset);
        const compressionMethod = localHeader.slice(10, 11);
        expect(compressionMethod[0]).toBe(0); // STORE method
    });
});