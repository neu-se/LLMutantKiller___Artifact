import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder', () => {
    it('should use high compression by default when no options are provided', async () => {
        const src = './test';
        const zipFilePath = './output.zip';
        const optionsWithoutCompression: any = {};
        await zip(src, zipFilePath, optionsWithoutCompression);
        const optionsWithHighCompression: any = { compression: 9 };
        await zip(src, zipFilePath, optionsWithHighCompression);
        const stats1 = await import('fs/promises').then(fs => fs.stat(zipFilePath));
        await zip(src, zipFilePath, optionsWithoutCompression);
        const stats2 = await import('fs/promises').then(fs => fs.stat(zipFilePath));
        expect(stats1.size).toBeLessThan(stats2.size);
        expect(optionsWithoutCompression.compression).toBe(9);
    });
});