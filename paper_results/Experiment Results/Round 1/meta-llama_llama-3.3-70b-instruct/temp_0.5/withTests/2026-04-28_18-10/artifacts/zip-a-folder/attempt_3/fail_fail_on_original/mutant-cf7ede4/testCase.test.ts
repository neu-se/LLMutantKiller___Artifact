import * as fs from 'fs';
import * as path from 'path';
import { zip, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testZIP = path.resolve(__dirname, 'test.zip');
    const testMEDIUMZIP = path.resolve(__dirname, 'testMEDIUM.zip');
    const testHIGHZIP = path.resolve(__dirname, 'testHIGH.zip');

    it('should use the default compression level when no compression level is provided', async () => {
        await zip(path.resolve(__dirname, 'data/'), testMEDIUMZIP, { compression: COMPRESSION_LEVEL.medium });
        await zip(path.resolve(__dirname, 'data/'), testHIGHZIP);

        const sizeMedium = fs.statSync(testMEDIUMZIP).size;
        const sizeHigh = fs.statSync(testHIGHZIP).size;

        expect(sizeHigh).toBeLessThan(sizeMedium);
    });
});