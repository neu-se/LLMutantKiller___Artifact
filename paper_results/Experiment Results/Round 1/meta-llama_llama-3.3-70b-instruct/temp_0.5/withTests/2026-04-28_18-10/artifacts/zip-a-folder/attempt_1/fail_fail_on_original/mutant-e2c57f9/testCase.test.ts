import * as fs from 'fs';
import * as path from 'path';
import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    it('should create a zip file with store: true', async () => {
        const testZip = path.resolve(__dirname, 'test.zip');
        await zip(path.resolve(__dirname, 'data/'), testZip, { compression: 0 });
        expect(fs.existsSync(testZip)).toBe(true);
        const stats = fs.statSync(testZip);
        expect(stats.size).toBeGreaterThan(0);
    });
});