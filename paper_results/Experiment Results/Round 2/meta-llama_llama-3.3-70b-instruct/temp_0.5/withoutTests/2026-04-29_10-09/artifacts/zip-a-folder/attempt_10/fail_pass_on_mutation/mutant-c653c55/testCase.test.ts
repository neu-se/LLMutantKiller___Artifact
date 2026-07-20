import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should create a zip file with store compression when no compression level is specified', async () => {
        const src = './test-data';
        const zipFilePath = './test-data.zip';

        // Create test data
        fs.mkdirSync(src, { recursive: true });
        fs.writeFileSync(path.join(src, 'test.txt'), 'Hello World');

        await ZipAFolder.zip(src, zipFilePath, { compression: 0 });

        // Read the zip file
        const zipBuffer = fs.readFileSync(zipFilePath);

        // Check the size of the zip file
        const originalSize = fs.statSync(path.join(src, 'test.txt')).size;
        expect(zipBuffer.length).toBeGreaterThan(originalSize);

        // Clean up
        rimraf.sync(src);
        rimraf.sync(zipFilePath);
    });
});