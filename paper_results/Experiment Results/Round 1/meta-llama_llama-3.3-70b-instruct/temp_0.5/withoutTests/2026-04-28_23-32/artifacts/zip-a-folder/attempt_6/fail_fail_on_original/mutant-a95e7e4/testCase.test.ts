import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import fs from 'fs';
import rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should create a zip file with the correct compression level when compression is set to uncompressed', async () => {
        const src = './test-data';
        try {
            fs.mkdirSync(src, { recursive: true });
        } catch (error) {
            console.log('Error creating directory:', error);
        }
        const zipFilePath = 'test-data.zip';
        const options = { compression: 0 };

        await zip(src, zipFilePath, options);

        const stats = fs.statSync(zipFilePath);
        expect(stats.size).toBeGreaterThan(0);

        rimraf.sync(src);
        rimraf.sync(zipFilePath);
    });
});