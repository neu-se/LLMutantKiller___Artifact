import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder', () => {
    it('should use the default compression level when not provided', async () => {
        const src = 'test';
        const tarFilePath = 'test.tar.gz';
        const zipAFolderOptions: any = {};
        await ZipAFolder.tar(src, tarFilePath, zipAFolderOptions);
        await expect(ZipAFolder.tar(src, tarFilePath)).rejects.not.toThrowError();
    });
});