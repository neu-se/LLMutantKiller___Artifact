import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should use the default compression level when not provided', async () => {
        const src = 'test-src';
        const tarFilePath = 'test-tar-file.tar.gz';
        const zipAFolderOptions: any = {};

        await ZipAFolder.tar(src, tarFilePath, zipAFolderOptions);
        expect(fs.existsSync(tarFilePath)).toBe(true);

        // Clean up
        rimraf.sync(tarFilePath);
    });
});