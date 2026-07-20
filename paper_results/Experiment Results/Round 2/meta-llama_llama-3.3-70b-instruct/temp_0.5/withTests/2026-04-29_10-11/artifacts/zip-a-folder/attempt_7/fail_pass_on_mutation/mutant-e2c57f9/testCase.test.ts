import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as zlib from 'zlib';

describe('Zip-A-Folder Test', function () {
    it('should create a zip file with compression level 0', async () => {
        const testZip = path.resolve(__dirname, 'test.zip');
        const testFolder = path.resolve(__dirname, '../test/data');
        if (fs.existsSync(testFolder)) {
            try {
                await zip(testFolder, testZip, { compression: 0 });
                const zipBuffer = fs.readFileSync(testZip);
                const gunzippedBuffer = zlib.gunzipSync(zipBuffer);
                expect(gunzippedBuffer).toBeDefined();
            } finally {
                rimraf.sync(testZip);
            }
        }
    });
});