import 'jest-extended';
import * as fs from 'fs';
import * as path from 'path';
import { zip, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    it('should use the default compression level when not provided', async () => {
        const testZIP = path.resolve(__dirname, 'test.zip');
        const src = path.resolve(__dirname, '../data/'); // ensure the source directory exists
        await zip(src, testZIP);
        const stats = fs.statSync(testZIP);
        const size = stats.size;
        await zip(src, testZIP, { compression: COMPRESSION_LEVEL.high });
        const stats2 = fs.statSync(testZIP);
        const size2 = stats2.size;
        expect(size).toBeLessThan(size2);
    });
});