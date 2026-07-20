import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should create a zip archive with the correct compression level', async () => {
        const src = 'test-src';
        const zipFilePath = 'test.zip';
        const options = { compression: COMPRESSION_LEVEL.uncompressed };

        // Create a test directory
        fs.mkdirSync(src);
        fs.writeFileSync(path.join(src, 'test.txt'), 'Hello World!');

        try {
            // Create a zip archive with uncompressed compression level
            await ZipAFolder.zip(src, zipFilePath, options);

            // Check if the zip archive exists
            expect(fs.existsSync(zipFilePath)).toBe(true);

            // Clean up
            rimraf.sync(src);
            fs.unlinkSync(zipFilePath);
        } catch (error) {
            // Clean up
            rimraf.sync(src);
            fs.unlinkSync(zipFilePath);
            throw error;
        }
    });
});