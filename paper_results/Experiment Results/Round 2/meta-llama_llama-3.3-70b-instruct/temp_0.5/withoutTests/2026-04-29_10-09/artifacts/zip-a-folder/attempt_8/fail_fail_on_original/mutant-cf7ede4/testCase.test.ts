import { ZipAFolder } from '../../../lib/ZipAFolder';
import * as fs from 'fs';
import * as rimraf from 'rimraf';

describe('ZipAFolder', () => {
    it('should throw an error when compression level is not set', async () => {
        const src = 'test';
        const zipFilePath = 'test.zip';
        try {
            await fs.promises.mkdir(src);
            await ZipAFolder.zip(src, zipFilePath, { compression: undefined });
            throw new Error('Expected an error to be thrown');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        } finally {
            rimraf.sync(src);
            rimraf.sync(zipFilePath);
        }
    });
});