import 'jest-extended';
import * as fs from 'fs';
import * as path from 'path';
import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    it('should create an uncompressed zip file with store option', async () => {
        const testUNCOMPRESSEDZIP = path.resolve(__dirname, 'testUNCOMPRESSED.zip');
        await ZipAFolder.zip(path.resolve(__dirname, 'data/'), testUNCOMPRESSEDZIP, {
            compression: 0,
        });
        const stats = fs.statSync(testUNCOMPRESSEDZIP);
        const fileSize = stats.size;
        // Check if the file size is not zero
        expect(fileSize).toBeGreaterThan(0);
        // Check if the file is a valid zip file
        const zipBuffer = fs.readFileSync(testUNCOMPRESSEDZIP);
        // Check the first two bytes of the zip file, which should be 0x50 0x4B (PK)
        expect(zipBuffer.slice(0, 2)).toEqual(Buffer.from([0x50, 0x4B]));
    });
});