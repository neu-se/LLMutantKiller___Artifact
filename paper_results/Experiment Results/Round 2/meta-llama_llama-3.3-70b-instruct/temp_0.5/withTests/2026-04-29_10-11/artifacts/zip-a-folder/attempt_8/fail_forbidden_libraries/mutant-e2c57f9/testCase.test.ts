import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as zlib from 'zlib';
import * as JSZip from 'jszip';

describe('Zip-A-Folder Test', function () {
    it('should create a zip file with compression level 0', async () => {
        const testZip = path.resolve(__dirname, 'test.zip');
        const testFolder = path.resolve(__dirname, '../test/data');
        if (fs.existsSync(testFolder)) {
            try {
                await zip(testFolder, testZip, { compression: 0 });
                const zipBuffer = fs.readFileSync(testZip);
                const zip = await JSZip.loadAsync(zipBuffer);
                expect(zip.files).toBeDefined();
                for (const filename in zip.files) {
                    if (zip.files.hasOwnProperty(filename)) {
                        const file = zip.files[filename];
                        expect(file.uncompressedSize).toBeGreaterThan(0);
                        expect(file.compressedSize).toBe(file.uncompressedSize);
                    }
                }
            } finally {
                rimraf.sync(testZip);
            }
        }
    });
});