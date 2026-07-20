import { ZipAFolder } from '../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Zip-A-Folder Test', function () {
    const testTAR = path.resolve(__dirname, 'test.tgz');
    const testUNCOMPRESSEDTAR = path.resolve(__dirname, 'testUNCOMPRESSED.tar');
    const testMEDIUMTAR = path.resolve(__dirname, 'testMEDIUM.tgz');
    const testSMALLTAR = path.resolve(__dirname, 'testSMALL.tgz');

    beforeAll(() => {
        rimraf.sync('test/*.tgz');
        rimraf.sync('test/*.tar');
    });

    it('tar function should throw an error when compression level is not used', async () => {
        await expect(
            ZipAFolder.tar(path.resolve(__dirname, 'data/'), testTAR, { compression: ZipAFolder.COMPRESSION_LEVEL.uncompressed })
        ).resolves.not.toThrow();
        await expect(
            ZipAFolder.tar(path.resolve(__dirname, 'data/'), testTAR, { compression: ZipAFolder.COMPRESSION_LEVEL.medium })
        ).resolves.not.toThrow();
        await expect(
            ZipAFolder.tar(path.resolve(__dirname, 'data/'), testTAR, { compression: ZipAFolder.COMPRESSION_LEVEL.high })
        ).resolves.not.toThrow();
        const sizeUNCOMPRESSED = fs.statSync(testUNCOMPRESSEDTAR).size;
        const sizeMEDIUM = fs.statSync(testMEDIUMTAR).size;
        const sizeSMALL = fs.statSync(testSMALLTAR).size;
        expect(sizeMEDIUM).toBeLessThan(sizeUNCOMPRESSED);
        expect(sizeSMALL).toBeLessThan(sizeMEDIUM);
    });
});