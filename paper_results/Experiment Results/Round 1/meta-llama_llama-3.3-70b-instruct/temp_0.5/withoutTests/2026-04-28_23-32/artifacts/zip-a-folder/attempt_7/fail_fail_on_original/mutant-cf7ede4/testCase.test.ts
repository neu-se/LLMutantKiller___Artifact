import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder', () => {
    it('should use high compression by default when no options are provided', async () => {
        const src = './test';
        const zipFilePath = './output.zip';
        const optionsWithoutCompression: any = {};
        const result = await zip(src, zipFilePath, optionsWithoutCompression);
        expect(result).not.toBeUndefined();
    });
});