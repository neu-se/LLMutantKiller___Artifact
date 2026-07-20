import {COMPRESSION_LEVEL, ZipAFolder as zipafolder} from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as path from 'path';

describe('Zip-A-Folder Test', function () {
    const testUNCOMPRESSEDZIP = path.resolve(__dirname, 'testUNCOMPRESSED.zip');
    const testZIP = path.resolve(__dirname, 'test.zip');

    beforeAll(() => {
        rimraf.sync('test/*.tgz');
        rimraf.sync('test/*.tar');
        rimraf.sync('test/*.zip');
    });

    it('should create an uncompressed zip file when compression level is set to uncompressed', async () => {
        await zipafolder.zip(path.resolve(__dirname, './'), testUNCOMPRESSEDZIP, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });
        expect(fs.existsSync(testUNCOMPRESSEDZIP)).toBe(true);
        const stats = fs.statSync(testUNCOMPRESSEDZIP);
        await zipafolder.zip(path.resolve(__dirname, './'), testZIP);
        const statsCompressed = fs.statSync(testZIP);
        expect(stats.size).toBeGreaterThan(statsCompressed.size);
    });
});