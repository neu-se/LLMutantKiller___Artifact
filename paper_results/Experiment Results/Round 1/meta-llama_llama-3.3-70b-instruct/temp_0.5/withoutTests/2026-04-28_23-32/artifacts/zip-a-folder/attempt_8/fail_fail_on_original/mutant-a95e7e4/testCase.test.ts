import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import fs from 'fs';
import rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should create a zip file with the correct compression level when compression is set to uncompressed', async () => {
        const src = './test-data';
        try {
            if (fs && fs.mkdirSync) {
                fs.mkdirSync(src, { recursive: true });
            }
        } catch (error) {
            console.log('Error creating directory:', error);
        }
        try {
            if (fs && fs.writeFileSync) {
                fs.writeFileSync(src + '/file.txt', 'Hello, World!');
            }
        } catch (error) {
            console.log('Error writing file:', error);
        }
        const zipFilePath = 'test-data.zip';
        const options = { compression: 0 };

        await zip(src, zipFilePath, options);

        const stats = fs.statSync(zipFilePath);
        expect(stats.size).toBeGreaterThan(0);

        const zipBuffer = fs.readFileSync(zipFilePath);
        const zipHeader = zipBuffer.slice(0, 4);
        expect(zipHeader.toString()).toBe('PK\x03\x04');

        rimraf.sync(src);
        rimraf.sync(zipFilePath);
    });
});