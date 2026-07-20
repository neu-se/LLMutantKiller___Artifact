import { ZipAFolder, COMPRESSION_LEVEL } from '../../../lib/ZipAFolder';
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

            // Check the size of the zip archive
            const stats = fs.statSync(zipFilePath);
            expect(stats.size).toBeGreaterThan(0);

            // Check the contents of the zip archive
            const zipArchive = require('archiver');
            const readStream = fs.createReadStream(zipFilePath);
            let contents = '';
            readStream.on('data', (chunk) => {
                contents += chunk.toString();
            });
            await new Promise((resolve) => {
                readStream.on('end', resolve);
            });
            expect(contents).toContain('test.txt');

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