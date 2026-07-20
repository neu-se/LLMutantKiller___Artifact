import { zip } from '../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { expect } from '@jest/globals';

describe('ZipAFolder', () => {
    it('should use the default compression level when none is provided', async () => {
        const src = 'test';
        const zipFilePath = 'test.zip';
        try {
            await fs.promises.mkdir(src);
            await zip(src, zipFilePath);
            const stats = await fs.promises.stat(zipFilePath);
            expect(stats.size).toBeGreaterThan(0);
            const zipBuffer = await fs.promises.readFile(zipFilePath);
            // Check if the zip file is not empty and has a valid zip structure
            expect(zipBuffer.toString('hex', 0, 4)).toBe('504b0304');
        } finally {
            rimraf.sync(src);
            rimraf.sync(zipFilePath);
        }
    });
});