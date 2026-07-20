import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';
import * as fs from 'fs';
import * as rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should throw an error when compression level is not provided in the mutated code', async () => {
        const src = './test-src';
        const tarFilePath = './test-tar-file.tar';
        fs.mkdirSync(src);
        try {
            await ZipAFolder.tar(src, tarFilePath, {});
            const stat = fs.statSync(tarFilePath);
            expect(stat.size).toBeGreaterThan(0);
            const fileBuffer = fs.readFileSync(tarFilePath);
            const gzipHeader = Buffer.from([0x1f, 0x8b, 0x08]);
            if (fileBuffer.slice(0, 3).equals(gzipHeader)) {
                throw new Error('Expected no gzip header');
            }
        } catch (error) {
            throw new Error('Expected no error');
        } finally {
            rimraf.sync(src);
            rimraf.sync(tarFilePath);
        }
    });
});