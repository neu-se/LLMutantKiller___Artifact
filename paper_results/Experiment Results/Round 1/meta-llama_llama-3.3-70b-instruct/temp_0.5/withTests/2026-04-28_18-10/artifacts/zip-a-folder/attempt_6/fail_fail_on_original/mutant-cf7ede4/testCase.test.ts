import * as fs from 'fs';
import * as path from 'path';
import { zip, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testZIP = path.resolve(__dirname, 'test.zip');

    it('should use the default compression level when no compression level is provided', async () => {
        const result1 = await zip(path.resolve(__dirname, './data/'), testZIP, { compression: COMPRESSION_LEVEL.high });
        const result2 = await zip(path.resolve(__dirname, './data/'), testZIP);

        expect(result1).toBeUndefined();
        expect(result2).toBeUndefined();
    });
});