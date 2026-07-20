import 'jest-extended';
import * as rimraf from 'rimraf';
import * as path from 'path';
import { ZipAFolder as zipafolder, COMPRESSION_LEVEL } from '../lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testTAR = path.resolve(__dirname, 'test.tgz');

    beforeAll(() => {
        rimraf.sync('test/*.tgz');
    });

    it('should create a tar file with the correct compression level', async () => {
        await expect(zipafolder.tar(path.resolve(__dirname, 'data/'), testTAR, { compression: COMPRESSION_LEVEL.uncompressed })).resolves.not.toThrow();
        await expect(zipafolder.tar(path.resolve(__dirname, 'data/'), testTAR, { compression: COMPRESSION_LEVEL.high })).resolves.not.toThrow();
    });
});