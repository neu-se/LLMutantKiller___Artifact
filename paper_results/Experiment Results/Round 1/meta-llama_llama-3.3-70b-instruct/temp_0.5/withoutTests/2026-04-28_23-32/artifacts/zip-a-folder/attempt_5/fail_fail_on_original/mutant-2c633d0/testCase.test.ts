import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';

describe('ZipAFolder', () => {
    it('should use the default compression level when not provided', async () => {
        const src = 'test';
        const tarFilePath = 'test.tar.gz';
        const zipAFolderOptions: any = {};
        await ZipAFolder.tar(src, tarFilePath, zipAFolderOptions);
        const stats = fs.statSync(tarFilePath);
        expect(stats.size).toBeGreaterThan(0);
        fs.unlinkSync(tarFilePath);
        await expect(ZipAFolder.tar(src, tarFilePath)).rejects.not.toThrowError();
    });
});