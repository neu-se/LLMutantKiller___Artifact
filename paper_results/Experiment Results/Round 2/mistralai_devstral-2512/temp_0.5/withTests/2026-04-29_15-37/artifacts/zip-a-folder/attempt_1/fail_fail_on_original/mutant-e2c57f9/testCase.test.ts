'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, zip } from '../lib/ZipAFolder';

describe('ZipAFolder store option test', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const outputPath = path.resolve(__dirname, 'test-uncompressed.zip');

    beforeAll(() => {
        // Create test directory and file
        fs.mkdirSync(testDir, { recursive: true });
        fs.writeFileSync(path.join(testDir, 'test.txt'), 'test content');
    });

    afterAll(() => {
        // Cleanup
        rimraf.sync(testDir);
        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }
    });

    it('should create uncompressed zip with store option enabled', async () => {
        await zip(testDir, outputPath, {
            compression: COMPRESSION_LEVEL.uncompressed
        });

        expect(fs.existsSync(outputPath)).toBe(true);

        // Read the zip file and check if it's uncompressed
        const zipContent = fs.readFileSync(outputPath);
        // Check for the presence of the 'store' method by verifying the local file header
        // In ZIP format, uncompressed files should have their data stored directly
        // We can verify this by checking if the file content appears in the zip
        expect(zipContent.includes(Buffer.from('test content'))).toBe(true);
    });
});