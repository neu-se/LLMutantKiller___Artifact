import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder', () => {
    it('should throw an error when no compression level is provided in options', async () => {
        const src = './test';
        const zipFilePath = './output.zip';
        const optionsWithoutCompression: any = {};
        delete optionsWithoutCompression.compression;
        await expect(zip(src, zipFilePath, optionsWithoutCompression)).rejects.toThrowError();
    });
});