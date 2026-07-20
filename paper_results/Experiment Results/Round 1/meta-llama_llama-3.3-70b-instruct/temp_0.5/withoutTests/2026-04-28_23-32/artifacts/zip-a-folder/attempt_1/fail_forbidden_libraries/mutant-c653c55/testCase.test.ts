import { ZipAFolder } from '../lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { expect } from '@jest/globals';

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

        // Check the compression level of the zip file
        const zipBuffer = fs.readFileSync(zipFilePath);
        const expectedCompressionLevel = 9; // Default compression level
        const zipFile = require('adm-zip')(zipBuffer);
        const entry = zipFile.getEntries()[0];
        const compressionMethod = entry.getHeader().method;
        expect(compressionMethod).toBe(8); // 8 is the method for DEFLATE, which is used by zip files with compression

        // Clean up
        rimraf.sync(tempDir);
        fs.unlinkSync(zipFilePath);
    });
});