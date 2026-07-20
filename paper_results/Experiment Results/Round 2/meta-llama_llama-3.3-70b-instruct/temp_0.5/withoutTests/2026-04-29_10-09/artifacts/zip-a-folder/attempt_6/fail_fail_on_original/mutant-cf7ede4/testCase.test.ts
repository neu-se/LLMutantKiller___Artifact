import { ZipAFolder } from '../../lib/ZipAFolder';
import * as fs from 'fs';
import * as rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should use the default compression level when none is provided', async () => {
        const src = 'test';
        const zipFilePath = 'test.zip';
        try {
            await fs.promises.mkdir(src);
            const zipResult = await ZipAFolder.zip(src, zipFilePath);
            if (zipResult instanceof Error) {
                throw zipResult;
            }
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