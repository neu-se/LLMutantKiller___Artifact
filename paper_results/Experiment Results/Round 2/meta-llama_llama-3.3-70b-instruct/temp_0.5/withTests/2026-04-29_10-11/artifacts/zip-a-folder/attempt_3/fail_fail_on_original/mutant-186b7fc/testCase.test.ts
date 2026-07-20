import { tar, ZipAFolder } from '../../../lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Zip-A-Folder Test', function () {
    const testTAR = path.resolve(__dirname, 'test.tgz');
    const testUNCOMPRESSEDTAR = path.resolve(__dirname, 'testUNCOMPRESSED.tar');

    beforeAll(() => {
        rimraf.sync('test/*.tgz');
        rimraf.sync('test/*.tar');
    });

    it('tar function should create a tar file with the correct compression level', async () => {
        await expect(
            ZipAFolder.tar(path.resolve(__dirname, 'data/'), testUNCOMPRESSEDTAR, { compression: ZipAFolder.COMPRESSION_LEVEL.uncompressed })
        ).resolves.not.toThrow();
        await expect(
            ZipAFolder.tar(path.resolve(__dirname, 'data/'), testTAR)
        ).resolves.not.toThrow();
        const statsUncompressed = fs.statSync(testUNCOMPRESSEDTAR);
        const statsCompressed = fs.statSync(testTAR);
        expect(statsCompressed.size).toBeLessThan(statsUncompressed.size);
    });
});