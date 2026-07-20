import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Zip-A-Folder Test', function () {
    it('should create a zip file with store: true', async () => {
        const testZip = path.resolve(__dirname, 'test.zip');
        const testFolder = path.resolve(__dirname, '../test/tests-ZipAFolder.ts');
        try {
            await zip(testFolder, testZip, { compression: 0 });
            const zipStats = fs.statSync(testZip);
            expect(zipStats.size).toBeGreaterThan(0);
        } finally {
            rimraf.sync(testZip);
        }
    });
});