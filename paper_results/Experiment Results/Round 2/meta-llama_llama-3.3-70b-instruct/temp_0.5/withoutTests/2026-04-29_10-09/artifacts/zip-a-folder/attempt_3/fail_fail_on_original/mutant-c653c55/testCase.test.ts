import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import { rm } from 'rimraf';
import * as archiver from 'archiver';

describe('ZipAFolder', () => {
    it('should create a zip file with store compression when no compression level is specified', async () => {
        const src = './test-data';
        const zipFilePath = './test-data.zip';

        // Create test data
        fs.mkdirSync(src, { recursive: true });
        fs.writeFileSync(path.join(src, 'test.txt'), 'Hello World');

        await ZipAFolder.zip(src, zipFilePath);

        // Read the zip file
        const zipBuffer = fs.readFileSync(zipFilePath);

        // Check if the zip file is not compressed
        const zipEntry = zipBuffer.toString('hex', 30, 34);
        expect(zipEntry).toBe('0800'); // No compression

        // Clean up
        rm('-rf', src);
        rm(zipFilePath);
    });
});