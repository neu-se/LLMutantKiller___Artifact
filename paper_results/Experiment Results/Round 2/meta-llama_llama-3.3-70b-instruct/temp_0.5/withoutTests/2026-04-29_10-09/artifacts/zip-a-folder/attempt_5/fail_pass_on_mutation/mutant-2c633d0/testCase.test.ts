import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';
import * as fs from 'fs';
import * as rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should use the default compression level when not provided', async () => {
        const src = './test-src';
        const tarFilePath = './test-tar-file.tar';
        const zipFilePath = './test-zip-file.zip';
        fs.mkdirSync(src);
        try {
            await ZipAFolder.tar(src, tarFilePath, {});
            await ZipAFolder.zip(src, zipFilePath, {});
            const tarStat = fs.statSync(tarFilePath);
            const zipStat = fs.statSync(zipFilePath);
            expect(tarStat.size).toBeGreaterThan(0);
            expect(zipStat.size).toBeGreaterThan(0);
        } finally {
            rimraf.sync(src);
            rimraf.sync(tarFilePath);
            rimraf.sync(zipFilePath);
        }
    });
});