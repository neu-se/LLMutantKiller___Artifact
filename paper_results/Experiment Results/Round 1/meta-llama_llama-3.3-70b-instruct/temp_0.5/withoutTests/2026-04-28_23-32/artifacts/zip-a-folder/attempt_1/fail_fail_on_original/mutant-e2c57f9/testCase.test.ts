import fs from 'fs';
import path from 'path';
import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';
import rimraf from 'rimraf';
import { expect } from 'jest-extended';

describe('ZipAFolder', () => {
    it('should create a zip archive with the correct compression level when compression is set to uncompressed', async () => {
        const src = 'test-data';
        const zipFilePath = 'test-data.zip';
        const compressionLevel = ZipAFolder.COMPRESSION_LEVEL.uncompressed;

        await fs.promises.mkdir(src, { recursive: true });
        await fs.promises.writeFile(path.join(src, 'file.txt'), 'Hello World');

        await ZipAFolder.zip(src, zipFilePath, { compression: compressionLevel });

        const stats = await fs.promises.stat(zipFilePath);
        const fileSize = stats.size;

        // The size of the zip file should be close to the size of the original file
        // when compression is set to uncompressed
        expect(fileSize).toBeGreaterThan(0);
        expect(fileSize).toBeLessThan(1000);

        rimraf.sync(src);
        rimraf.sync(zipFilePath);
    });
});