import 'jest-extended';
import * as fs from 'fs';
import * as path from 'path';
import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    it('should throw an error when compression level is not provided and default is not set', async () => {
        const testZIP = path.resolve(__dirname, 'test.zip');
        const src = path.resolve(__dirname, 'data/');
        await expect(zip(src, testZIP)).rejects.toThrow();
    });
});