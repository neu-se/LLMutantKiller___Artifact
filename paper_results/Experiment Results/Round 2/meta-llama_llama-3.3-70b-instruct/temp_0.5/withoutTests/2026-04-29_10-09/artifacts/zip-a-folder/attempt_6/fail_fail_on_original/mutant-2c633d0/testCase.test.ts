import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';
import * as fs from 'fs';
import * as rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should use the default compression level when not provided', async () => {
        const src = './test-src';
        const tarFilePath = './test-tar-file.tar';
        fs.mkdirSync(src);
        try {
            await ZipAFolder.tar(src, tarFilePath, {});
            const stat = fs.statSync(tarFilePath);
            expect(stat.size).toBeGreaterThan(0);
            const fileBuffer = fs.readFileSync(tarFilePath);
            expect(fileBuffer.toString('utf8', 0, 2)).toBe('PK');
        } finally {
            rimraf.sync(src);
            rimraf.sync(tarFilePath);
        }
    });
});