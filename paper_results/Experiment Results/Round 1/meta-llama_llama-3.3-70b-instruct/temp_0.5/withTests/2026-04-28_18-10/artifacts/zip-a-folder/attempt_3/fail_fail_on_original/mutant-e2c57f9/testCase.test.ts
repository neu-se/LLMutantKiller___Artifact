import * as fs from 'fs';
import * as path from 'path';
import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as rimraf from 'rimraf';
import * as archiver from 'archiver';
import * as zlib from 'zlib';

describe('Zip-A-Folder Test', function () {
    const testZip = path.resolve(__dirname, 'test.zip');
    const testDir = path.resolve(__dirname, 'data');

    beforeAll(() => {
        rimraf.sync(testZip);
        fs.mkdirSync(testDir, { recursive: true });
        fs.writeFileSync(path.join(testDir, 'test.txt'), 'Hello World!');
    });

    afterAll(() => {
        rimraf.sync(testZip);
        rimraf.sync(testDir);
    });

    it('should create a zip file with store: true', async () => {
        await zip(testDir, testZip, { compression: 0 });
        expect(fs.existsSync(testZip)).toBe(true);
        const stats = fs.statSync(testZip);
        expect(stats.size).toBeGreaterThan(0);
        const zipFile = fs.createReadStream(testZip);
        const unzip = archiver('zip', { zlib: { level: 0 } });
        const output = fs.createWriteStream('unzipped');
        zipFile.pipe(unzip).pipe(output);
        await new Promise((resolve, reject) => {
            output.on('close', resolve);
            output.on('error', reject);
        });
        expect(fs.existsSync('unzipped/test.txt')).toBe(true);
        expect(fs.readFileSync('unzipped/test.txt', 'utf8')).toBe('Hello World!');
        rimraf.sync('unzipped');
    });
});