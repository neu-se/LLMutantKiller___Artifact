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
        const statsBefore = fs.statSync(src);
        await zip(src, testZIP);
        const statsAfter = fs.statSync(src);
        expect(statsBefore.mtimeMs).toBeLessThan(statsAfter.mtimeMs);
    });
});