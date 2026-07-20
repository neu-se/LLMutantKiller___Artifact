import 'jest-extended';
import * as fs from 'fs';
import * as path from 'path';
import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    it('should use the default compression level when not provided', async () => {
        const testZIP = path.resolve(__dirname, 'test.zip');
        const testZIP2 = path.resolve(__dirname, 'test2.zip');
        const src = path.resolve(__dirname, '../data/'); 
        if (!fs.existsSync(src)) {
            fs.mkdirSync(src);
        }
        await zip(src, testZIP);
        await zip(src, testZIP2, { compression: undefined });
        const stats1 = fs.statSync(testZIP);
        const stats2 = fs.statSync(testZIP2);
        expect(stats1.size).not.toEqual(stats2.size);
    });
});