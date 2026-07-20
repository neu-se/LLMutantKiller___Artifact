import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Zip-A-Folder Test', function () {
    const testUNCOMPRESSEDZIP = path.resolve(__dirname, 'testUNCOMPRESSED.zip');

    beforeAll(() => {
        rimraf.sync('test/*.zip');
    });

    it('should create an uncompressed zip file when compression is set to uncompressed', async () => {
        await zip(path.resolve(__dirname, 'data/'), testUNCOMPRESSEDZIP, {
            compression: 0,
        });

        expect(fs.existsSync(testUNCOMPRESSEDZIP)).toBe(true);

        const stats = fs.statSync(testUNCOMPRESSEDZIP);
        expect(stats.size).toBeGreaterThan(0);
    });
});