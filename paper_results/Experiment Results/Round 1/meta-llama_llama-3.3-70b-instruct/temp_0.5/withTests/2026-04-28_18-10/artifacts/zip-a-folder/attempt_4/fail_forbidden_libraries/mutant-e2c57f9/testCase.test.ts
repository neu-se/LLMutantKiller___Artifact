import * as fs from 'fs';
import * as path from 'path';
import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as rimraf from 'rimraf';
import * as AdmZip from 'adm-zip';

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
        const zipFile = new AdmZip(testZip);
        const zipEntries = zipFile.getEntries();
        expect(zipEntries.length).toBe(1);
        expect(zipEntries[0].entryName).toBe('test.txt');
        expect(zipEntries[0].header.flags).toBe(0x8000); // STORE flag
    });
});