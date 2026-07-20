import * as fs from 'fs';
import * as path from 'path';
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
    });

    afterAll(() => {
        try {
            fs.unlinkSync(testZIP);
        } catch (e) {}
        try {
            fs.unlinkSync(testUNCOMPRESSEDZIP);
        } catch (e) {}
        try {
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
        const method = zipBuffer.readInt16LE(6);
        expect(method).toBe(0); // store method
    });
});