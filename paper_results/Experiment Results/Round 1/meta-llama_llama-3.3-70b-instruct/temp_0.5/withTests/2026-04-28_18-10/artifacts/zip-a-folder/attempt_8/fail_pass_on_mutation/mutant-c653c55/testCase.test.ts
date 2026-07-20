import 'jest-extended';
import * as fs from 'fs';
import * as path from 'path';
import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    it('should create an uncompressed zip file with store option', async () => {
        const testUNCOMPRESSEDZIP = path.resolve(__dirname, 'testUNCOMPRESSED.zip');
        const src = path.resolve(__dirname, 'data');
        fs.mkdirSync(src, { recursive: true });
        fs.writeFileSync(path.join(src, 'test.txt'), 'Hello World!');
        await ZipAFolder.zip(src, testUNCOMPRESSEDZIP, {
            compression: 0,
        });
        const zipBuffer = fs.readFileSync(testUNCOMPRESSEDZIP);
        const zipBufferString = zipBuffer.toString('hex');
        // Check if the file is a valid zip file
        expect(zipBufferString.startsWith('504b0304')).toBe(true);
        // Check the compression method in the local file header
        const localFileHeaderStart = zipBufferString.indexOf('504b0304');
        if (localFileHeaderStart === -1) {
            throw new Error('Local file header not found');
        }
        const compressionMethod = zipBufferString.slice(localFileHeaderStart + 18, localFileHeaderStart + 20);
        expect(compressionMethod).toBe('00'); // Store method
        fs.rmdirSync(src, { recursive: true });
        await fs.promises.unlink(testUNCOMPRESSEDZIP);
    });
});