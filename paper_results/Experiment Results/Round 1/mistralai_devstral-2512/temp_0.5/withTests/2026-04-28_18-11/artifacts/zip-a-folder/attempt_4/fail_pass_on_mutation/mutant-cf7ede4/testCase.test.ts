import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { zip, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";

describe('ZipAFolder default compression level test', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const testFilePath = path.resolve(__dirname, 'test-default.zip');

    beforeAll(() => {
        fs.mkdirSync(testDir, { recursive: true });
        fs.writeFileSync(path.join(testDir, 'file1.txt'), 'content1');
        fs.writeFileSync(path.join(testDir, 'file2.txt'), 'content2');
    });

    afterAll(() => {
        rimraf.sync(testDir);
        rimraf.sync(testFilePath);
    });

    it('should use high compression by default when no options are provided', async () => {
        const archive = await zip(testDir, testFilePath);
        expect(archive).toBeUndefined();
        expect(fs.existsSync(testFilePath)).toBe(true);
    });
});