import { zip } from '../../lib/ZipAFolder';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import { expect } from '@jest/globals';

describe('ZipAFolder', () => {
    it('should create a zip file with the correct compression level when compression is set to uncompressed', async () => {
        const src = 'test-data';
        const zipFilePath = 'test-data.zip';
        const options = { compression: 0 };

        await zip(src, zipFilePath, options);

        const stats = fs.statSync(zipFilePath);
        expect(stats.size).toBeGreaterThan(0);

        // Check if the zip file is not compressed
        const zipBuffer = fs.readFileSync(zipFilePath);
        const zipHeader = zipBuffer.slice(0, 4);
        expect(zipHeader.toString()).toBe('PK\x03\x04');

        rimraf.sync(zipFilePath);
    });
});