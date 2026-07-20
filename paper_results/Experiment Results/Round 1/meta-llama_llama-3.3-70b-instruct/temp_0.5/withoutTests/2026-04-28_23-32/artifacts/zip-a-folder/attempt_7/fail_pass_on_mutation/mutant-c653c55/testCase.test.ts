import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

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

        // Check the size of the zip file
        const zipBufferSize = fs.statSync(zipFilePath).size;
        const fileSize = fs.statSync(filePath).size;
        expect(zipBufferSize).toBeLessThan(fileSize * 0.9); // If compression is applied, the size of the zip file should be less than 90% of the original file size

        // Clean up
        rimraf.sync(tempDir);
        fs.unlinkSync(zipFilePath);
    });
});