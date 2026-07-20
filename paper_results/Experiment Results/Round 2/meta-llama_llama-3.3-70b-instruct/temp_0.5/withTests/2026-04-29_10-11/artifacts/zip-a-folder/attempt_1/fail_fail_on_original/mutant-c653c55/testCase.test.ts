import * as fs from 'fs';
import * as path from 'path';
import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testZIP = path.resolve(__dirname, 'test.zip');
    const testUNCOMPRESSEDZIP = path.resolve(__dirname, 'testUNCOMPRESSED.zip');

    beforeAll(() => {
        fs.unlinkSync(testZIP, () => {});
        fs.unlinkSync(testUNCOMPRESSEDZIP, () => {});
    });

    it('ZIP test folder with and without compression', async () => {
        await zip(path.resolve(__dirname, 'data/'), testUNCOMPRESSEDZIP, {
            compression: 0,
        });
        await zip(path.resolve(__dirname, 'data/'), testZIP);

        const sizeUNCOMPRESSED = fs.statSync(testUNCOMPRESSEDZIP).size;
        const sizeCOMPRESSED = fs.statSync(testZIP).size;
        expect(sizeCOMPRESSED).toBeLessThan(sizeUNCOMPRESSED);
    });
});