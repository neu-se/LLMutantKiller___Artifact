import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { expect } from '@jest/globals';

describe('ZipAFolder', () => {
    it('should throw an error when compression level is not provided and default compression level is high', async () => {
        const src = 'test-src';
        const tarFilePath = 'test-tar-file.tar';
        const zipAFolderOptions: any = {};

        await expect(ZipAFolder.tar(src, tarFilePath, zipAFolderOptions)).rejects.toThrow();

        // Clean up
        rimraf.sync(tarFilePath);
    });
});