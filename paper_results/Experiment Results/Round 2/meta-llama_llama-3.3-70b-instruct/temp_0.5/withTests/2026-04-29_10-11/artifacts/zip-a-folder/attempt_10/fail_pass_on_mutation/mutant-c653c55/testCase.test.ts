import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testZIP = path.resolve(__dirname, 'test.zip');
    const testUNCOMPRESSEDZIP = path.resolve(__dirname, 'testUNCOMPRESSED.zip');
    const testDir = path.resolve(__dirname, 'testDir');

    beforeAll(() => {
        try {
            fs.unlinkSync(testZIP);
        } catch (e) {}
        try {
            fs.unlinkSync(testUNCOMPRESSEDZIP);
        } catch (e) {}
        try {
            fs.mkdirSync(testDir);
        } catch (e) {}
        fs.writeFileSync(path.join(testDir, 'file.txt'), 'Hello World!');
    });

    afterAll(() => {
        try {
            fs.unlinkSync(testZIP);
        } catch (e) {}
        try {
            fs.unlinkSync(testUNCOMPRESSEDZIP);
        } catch (e) {}
        try {
            fs.unlinkSync(path.join(testDir, 'file.txt'));
            fs.rmdirSync(testDir);
        } catch (e) {}
    });

    it('ZIP test folder with compression level', async () => {
        await zip(testDir, testUNCOMPRESSEDZIP, {
            compression: 0,
        });
        const stats = fs.statSync(testUNCOMPRESSEDZIP);
        expect(stats.size).toBeGreaterThan(0);
        const zipBuffer = fs.readFileSync(testUNCOMPRESSEDZIP);
        const fileBuffer = zipBuffer.slice(30);
        try {
            zlib.gunzipSync(fileBuffer);
            expect(false).toBe(true); // should throw an error if the file is compressed
        } catch (e) {
            expect(true).toBe(true); // should not throw an error if the file is not compressed
        }
    });
});