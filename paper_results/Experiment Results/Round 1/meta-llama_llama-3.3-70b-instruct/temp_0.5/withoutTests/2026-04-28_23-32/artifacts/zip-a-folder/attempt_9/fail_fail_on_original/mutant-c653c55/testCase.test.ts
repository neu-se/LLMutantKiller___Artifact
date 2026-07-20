import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as zlib from 'zlib';

describe('ZipAFolder', () => {
    it('should create a zip file with the correct compression level', async () => {
        // Create a temporary directory
        const tempDir = 'tempDir';
        if (fs.existsSync(tempDir)) {
            rimraf.sync(tempDir);
        }
        fs.mkdirSync(tempDir);

        // Create a large file inside the temporary directory
        const fileContent = 'Hello World!'.repeat(100000);
        const filePath = path.join(tempDir, 'file.txt');
        fs.writeFileSync(filePath, fileContent);

        // Zip the directory
        const zipFilePath = 'output.zip';
        if (fs.existsSync(zipFilePath)) {
            fs.unlinkSync(zipFilePath);
        }
        await ZipAFolder.zip(tempDir, zipFilePath);

        // Check the compression ratio of the zip file
        const zipBuffer = fs.readFileSync(zipFilePath);
        const unzipBuffer = await new Promise((resolve, reject) => {
            zlib.unzip(Buffer.from(zipBuffer), (err, buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
        });
        const compressionRatio = zipBuffer.length / unzipBuffer.length;
        expect(compressionRatio).toBeGreaterThan(2); // If compression is applied, the compression ratio should be greater than 2

        // Clean up
        rimraf.sync(tempDir);
        fs.unlinkSync(zipFilePath);
    });
});