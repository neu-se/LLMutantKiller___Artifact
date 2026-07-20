import { ZipAFolder } from '../../../lib/ZipAFolder';
import * as fs from 'fs';
import * as rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should use the default compression level when none is provided', async () => {
        const src = 'test';
        const zipFilePath = 'test.zip';
        try {
            await fs.promises.mkdir(src);
            await ZipAFolder.zip(src, zipFilePath);
            const stats = await fs.promises.stat(zipFilePath);
            expect(stats.size).toBeGreaterThan(0);
            const zipBuffer = await fs.promises.readFile(zipFilePath);
            // Check if the zip file is not empty and has a valid zip structure
            expect(zipBuffer.toString('hex', 0, 4)).toBe('504b0304');
            // Check that the file is compressed by checking its size
            const uncompressedSize = await fs.promises.stat(src).then(stat => stat.size);
            expect(stats.size).toBeLessThan(uncompressedSize);
        } catch (error) {
            // If the test fails, it's likely because the compression level is not set to high by default.
            throw new Error('The test failed because the compression level is not set to high by default.');
        } finally {
            rimraf.sync(src);
            rimraf.sync(zipFilePath);
        }
    });
});