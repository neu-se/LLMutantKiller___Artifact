import 'jest-extended';
import * as fs from 'fs';
import * as path from 'path';
import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    it('should throw an error when compression level is uncompressed and no store option is provided', async () => {
        const testUNCOMPRESSEDZIP = path.resolve(__dirname, 'testUNCOMPRESSED.zip');
        await expect(ZipAFolder.zip(path.resolve(__dirname, 'data/'), testUNCOMPRESSEDZIP, {
            compression: ZipAFolder.COMPRESSION_LEVEL.uncompressed,
        })).rejects.toThrow();
    });
});