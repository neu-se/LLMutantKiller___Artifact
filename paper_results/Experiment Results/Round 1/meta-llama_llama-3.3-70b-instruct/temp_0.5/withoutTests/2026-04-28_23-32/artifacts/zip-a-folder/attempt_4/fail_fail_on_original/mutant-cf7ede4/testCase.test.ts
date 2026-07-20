import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder', () => {
    it('should use high compression by default when no options are provided', async () => {
        const src = './test';
        const zipFilePath = './output.zip';
        const optionsWithHighCompression: any = { compression: 9 };
        await zip(src, zipFilePath, optionsWithHighCompression);
        const optionsWithoutCompression: any = {};
        await expect(zip(src, zipFilePath, optionsWithoutCompression)).rejects.toThrowError(
            'You must either provide a target file path or a custom write stream to write to.',
        );
    });
});