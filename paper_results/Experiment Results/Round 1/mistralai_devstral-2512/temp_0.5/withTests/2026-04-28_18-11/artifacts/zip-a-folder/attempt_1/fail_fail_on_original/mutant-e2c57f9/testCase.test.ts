'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, zip } from '../lib/ZipAFolder';

describe('ZipAFolder uncompressed zip behavior', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const outputPath = path.resolve(__dirname, 'test-uncompressed.zip');

    beforeAll(async () => {
        // Create test directory and files
        await fs.promises.mkdir(testDir, { recursive: true });
        await fs.promises.writeFile(path.join(testDir, 'file1.txt'), 'content1');
        await fs.promises.writeFile(path.join(testDir, 'file2.txt'), 'content2');
    });

    afterAll(async () => {
        // Clean up
        await fs.promises.rm(outputPath, { force: true });
        await fs.promises.rm(testDir, { recursive: true, force: true });
    });

    it('should create uncompressed zip with store=true behavior', async () => {
        await zip(testDir, outputPath, { compression: COMPRESSION_LEVEL.uncompressed });

        // Verify file exists
        expect(fs.existsSync(outputPath)).toBe(true);

        // Read the zip file and verify it's using STORE method (no compression)
        const zipContent = await fs.promises.readFile(outputPath);
        // ZIP files with STORE method should contain the files in their original form
        // We can check for the presence of file data in the archive
        expect(zipContent.includes(Buffer.from('content1'))).toBe(true);
        expect(zipContent.includes(Buffer.from('content2'))).toBe(true);
    });
});