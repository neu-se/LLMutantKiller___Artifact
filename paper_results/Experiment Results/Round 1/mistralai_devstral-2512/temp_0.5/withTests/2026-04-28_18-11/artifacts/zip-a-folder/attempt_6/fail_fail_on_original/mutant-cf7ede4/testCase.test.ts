import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { zip, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";

describe('ZipAFolder default compression test', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const testFilePathDefault = path.resolve(__dirname, 'test-default.zip');
    const testFilePathUncompressed = path.resolve(__dirname, 'test-uncompressed.zip');

    beforeAll(() => {
        fs.mkdirSync(testDir, { recursive: true });
        fs.writeFileSync(path.join(testDir, 'file1.txt'), 'content1');
        fs.writeFileSync(path.join(testDir, 'file2.txt'), 'content2');
    });

    afterAll(() => {
        rimraf.sync(testDir);
        rimraf.sync(testFilePathDefault);
        rimraf.sync(testFilePathUncompressed);
    });

    it('should use high compression by default when no options are provided', async () => {
        await zip(testDir, testFilePathUncompressed, { compression: COMPRESSION_LEVEL.uncompressed });
        await zip(testDir, testFilePathDefault);

        const uncompressedSize = fs.statSync(testFilePathUncompressed).size;
        const defaultSize = fs.statSync(testFilePathDefault).size;

        expect(defaultSize).toBeLessThan(uncompressedSize);
    });
});