import { ZipAFolder } from '../lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should create a zip file with the correct compression level', async () => {
        // Create a temporary directory
        const tempDir = 'tempDir';
        fs.mkdirSync(tempDir);

        // Create a file inside the temporary directory
        const fileContent = 'Hello World!';
        const filePath = path.join(tempDir, 'file.txt');
        fs.writeFileSync(filePath, fileContent);

        // Zip the directory
        const zipFilePath = 'output.zip';
        await ZipAFolder.zip(tempDir, zipFilePath);

        // Check the size of the zip file
        const zipBufferSize = fs.statSync(zipFilePath).size;
        expect(zipBufferSize).toBeLessThan(100); // If compression is not applied, the size will be larger

        // Clean up
        rimraf.sync(tempDir);
        fs.unlinkSync(zipFilePath);
    });
});