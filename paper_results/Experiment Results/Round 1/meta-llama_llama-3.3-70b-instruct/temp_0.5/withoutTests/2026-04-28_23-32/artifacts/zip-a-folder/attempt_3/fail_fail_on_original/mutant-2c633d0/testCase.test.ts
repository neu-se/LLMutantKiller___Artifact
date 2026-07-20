import { ZipAFolder, COMPRESSION_LEVEL } from '../../../lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import { rmSync } from 'fs';

describe('ZipAFolder', () => {
    it('should use the default compression level when not provided', async () => {
        const src = 'test';
        const tarFilePath = 'test.tar.gz';
        const zipAFolderOptions: any = {};
        await ZipAFolder.tar(src, tarFilePath, zipAFolderOptions);
        const stats = fs.statSync(tarFilePath);
        expect(stats.size).toBeGreaterThan(0);
        const zipAFolderOptions2: any = { compression: undefined };
        await expect(ZipAFolder.tar(src, tarFilePath, zipAFolderOptions2)).rejects.toThrowError();
        rmSync(tarFilePath);
    });
});