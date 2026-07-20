import fs from 'fs';
import path from 'path';
import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import archiver from 'archiver';
import rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should create a zip archive with store compression when compression is set to uncompressed', async () => {
        const src = 'test-data';
        const zipFilePath = 'test-data.zip';
        const compressionLevel = ZipAFolder.COMPRESSION_LEVEL.uncompressed;

        await fs.promises.mkdir(src, { recursive: true });
        await fs.promises.writeFile(path.join(src, 'file.txt'), 'Hello World');

        await ZipAFolder.zip(src, zipFilePath, { compression: compressionLevel });

        const zip = archiver('zip', { zlib: { level: 0 } });
        const output = fs.createWriteStream('test-data-copy.zip');
        zip.pipe(output);
        zip.directory(src, false);
        await zip.finalize();

        const stats = await fs.promises.stat(zipFilePath);
        const statsCopy = await fs.promises.stat('test-data-copy.zip');
        expect(stats.size).toBeCloseTo(statsCopy.size, -100);

        rimraf.sync(src);
        rimraf.sync(zipFilePath);
        rimraf.sync('test-data-copy.zip');
    });
});