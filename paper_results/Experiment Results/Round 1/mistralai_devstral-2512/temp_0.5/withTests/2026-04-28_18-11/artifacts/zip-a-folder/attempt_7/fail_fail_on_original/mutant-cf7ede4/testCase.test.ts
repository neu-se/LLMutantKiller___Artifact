import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { zip, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";

describe('ZipAFolder default compression level test', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const testFilePathDefault = path.resolve(__dirname, 'test-default.zip');
    const testFilePathMedium = path.resolve(__dirname, 'test-medium.zip');

    beforeAll(() => {
        fs.mkdirSync(testDir, { recursive: true });
        fs.writeFileSync(path.join(testDir, 'file1.txt'), 'content1'.repeat(1000));
        fs.writeFileSync(path.join(testDir, 'file2.txt'), 'content2'.repeat(1000));
    });

    afterAll(() => {
        rimraf.sync(testDir);
        rimraf.sync(testFilePathDefault);
        rimraf.sync(testFilePathMedium);
    });

    it('should use high compression by default when no options are provided', async () => {
        await zip(testDir, testFilePathMedium, { compression: COMPRESSION_LEVEL.medium });
        await zip(testDir, testFilePathDefault);

        const mediumSize = fs.statSync(testFilePathMedium).size;
        const defaultSize = fs.statSync(testFilePathDefault).size;

        expect(defaultSize).toBeLessThan(mediumSize);
    });
});