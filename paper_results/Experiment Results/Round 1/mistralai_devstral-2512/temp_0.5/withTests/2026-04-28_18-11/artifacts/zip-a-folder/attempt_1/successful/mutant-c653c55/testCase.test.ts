'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder uncompressed zip behavior', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const outputPath = path.resolve(__dirname, 'test-uncompressed.zip');

    beforeAll(async () => {
        await fs.promises.mkdir(testDir, { recursive: true });
        await fs.promises.writeFile(path.join(testDir, 'test.txt'), 'test content');
    });

    afterAll(async () => {
        await fs.promises.rm(outputPath, { force: true });
        await fs.promises.rm(testDir, { recursive: true, force: true });
    });

    it('should create an uncompressed zip file with store option', async () => {
        await zip(testDir, outputPath, { compression: 0 });

        const stats = await fs.promises.stat(outputPath);
        const fileContent = await fs.promises.readFile(outputPath);

        // Check that the file exists and has content
        expect(stats.size).toBeGreaterThan(0);

        // The key difference: when store=true is used, the zip should not have
        // compression headers. We can detect this by checking for the absence of
        // compression method bytes (0x08 for DEFLATE) in the local file headers.
        // Uncompressed files should have 0x00 in these positions.
        // This is a simplified check that looks for the presence of compression
        const hasCompression = fileContent.some((byte, i) => {
            // Check if this might be a local file header (PK\003\004)
            if (i + 3 < fileContent.length &&
                fileContent[i] === 0x50 &&  // P
                fileContent[i+1] === 0x4B && // K
                fileContent[i+2] === 0x03 && // 0x03
                fileContent[i+3] === 0x04) { // 0x04
                // Compression method is at offset 8 from start of header
                return fileContent[i+8] !== 0x00; // Should be 0x00 for stored
            }
            return false;
        });

        // The original code with store:true should produce uncompressed files
        // The mutated code with empty options might use default compression
        expect(hasCompression).toBe(false);
    });
});