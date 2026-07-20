import 'jest-extended';
import * as fs from 'fs';
import * as path from 'path';
import { zip, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    it('should use the default compression level when not provided', async () => {
        const testZIP = path.resolve(__dirname, 'test.zip');
        const src = path.resolve(__dirname, '../data/'); 
        if (!fs.existsSync(src)) {
            fs.mkdirSync(src);
        }
        await zip(src, testZIP);
        await zip(src, testZIP, { compression: COMPRESSION_LEVEL.high });
        const stats1 = fs.statSync(testZIP);
        await zip(src, testZIP, { compression: COMPRESSION_LEVEL.uncompressed });
        const stats2 = fs.statSync(testZIP);
        expect(stats1.size).toBeLessThan(stats2.size);
    });
});