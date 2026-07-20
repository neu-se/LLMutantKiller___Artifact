import * as fs from 'fs';
import * as path from 'path';
import { zip, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testZIP = path.resolve(__dirname, 'test.zip');
    const testUNCOMPRESSEDZIP = path.resolve(__dirname, 'testUNCOMPRESSED.zip');

    it('should use the default compression level when no compression level is provided', async () => {
        await zip(path.resolve(__dirname, 'data/'), testZIP);
        await zip(path.resolve(__dirname, 'data/'), testUNCOMPRESSEDZIP, { compression: COMPRESSION_LEVEL.uncompressed });

        const sizeCompressed = fs.statSync(testZIP).size;
        const sizeUncompressed = fs.statSync(testUNCOMPRESSEDZIP).size;

        expect(sizeCompressed).toBeLessThan(sizeUncompressed);
    });
});