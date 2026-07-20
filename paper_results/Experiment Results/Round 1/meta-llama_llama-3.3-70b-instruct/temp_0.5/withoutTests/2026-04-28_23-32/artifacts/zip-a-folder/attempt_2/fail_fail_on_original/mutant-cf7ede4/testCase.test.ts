import { ZipAFolder } from './ZipAFolder';

describe('ZipAFolder', () => {
    it('should use high compression by default when no options are provided', async () => {
        const src = './test';
        const zipFilePath = './output.zip';
        const zipAFolderOptions: any = {};
        await ZipAFolder.zip(src, zipFilePath, zipAFolderOptions);
        const stats = await import('fs/promises').stat(zipFilePath);
        const fileSize = stats.size;
        // The file size should be smaller than a certain threshold when high compression is used
        expect(fileSize).toBeLessThan(1000);
    });
});