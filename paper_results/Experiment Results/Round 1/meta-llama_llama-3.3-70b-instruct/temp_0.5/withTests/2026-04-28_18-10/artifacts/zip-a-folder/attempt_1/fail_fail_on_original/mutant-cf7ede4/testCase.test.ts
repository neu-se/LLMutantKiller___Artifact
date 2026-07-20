import * as fs from 'fs';
import * as path from 'path';
import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testZIP = path.resolve(__dirname, 'test.zip');

    it('should throw an error when no compression level is provided', async () => {
        await expect(zip(path.resolve(__dirname, 'data/'), testZIP)).rejects.toThrow(
            /You must either provide a target file path or a custom write stream to write to./
        );
    });
});