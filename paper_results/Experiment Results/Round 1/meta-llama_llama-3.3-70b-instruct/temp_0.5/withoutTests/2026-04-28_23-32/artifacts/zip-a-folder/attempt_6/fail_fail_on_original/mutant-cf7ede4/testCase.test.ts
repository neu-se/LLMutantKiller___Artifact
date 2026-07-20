import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder', () => {
    it('should use high compression by default when no options are provided', async () => {
        const src = './test';
        const zipFilePath = './output.zip';
        const optionsWithoutCompression: any = {};
        await zip(src, zipFilePath, optionsWithoutCompression);
        const stats = await import('fs/promises').then(fs => fs.stat(zipFilePath));
        const fileSize = stats.size;
        // The file size should be smaller than a certain threshold when high compression is used
        expect(fileSize).toBeLessThan(100000);
    });
});