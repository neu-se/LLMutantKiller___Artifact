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
        const zipEntries = [];
        let offset = 0;
        while (offset < zipBuffer.length) {
            const signature = zipBuffer.slice(offset, offset + 4);
            if (signature.toString('hex') === '504b0304') {
                const fileNameLength = zipBuffer[offset + 26];
                const extraFieldLength = zipBuffer[offset + 28];
                const fileDataOffset = offset + 30 + fileNameLength + extraFieldLength;
                const fileDataLength = zipBuffer.readInt32LE(offset + 18);
                const fileData = zipBuffer.slice(fileDataOffset, fileDataOffset + fileDataLength);
                zipEntries.push(fileData);
            }
            offset += 1;
        }
        expect(zipEntries.some(entry => entry.toString() === 'Hello World!')).toBe(true);
    });
});