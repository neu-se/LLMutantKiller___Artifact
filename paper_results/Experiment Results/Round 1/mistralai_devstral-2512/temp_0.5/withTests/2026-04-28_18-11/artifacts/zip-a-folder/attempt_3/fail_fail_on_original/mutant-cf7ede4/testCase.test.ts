import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { zip, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";

describe('ZipAFolder default compression test', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const testFilePath = path.resolve(__dirname, 'test-default-compression.zip');
    const testFilePathNoCompression = path.resolve(__dirname, 'test-no-compression.zip');

    beforeAll(() => {
        fs.mkdirSync(testDir, { recursive: true });
        fs.writeFileSync(path.join(testDir, 'file1.txt'), 'content1');
        fs.writeFileSync(path.join(testDir, 'file2.txt'), 'content2');
    });

    afterAll(() => {
        rimraf.sync(testDir);
        rimraf.sync(testFilePath);
        rimraf.sync(testFilePathNoCompression);
    });

    it('should use high compression by default when no options are provided', async () => {
        await zip(testDir, testFilePathNoCompression, { compression: COMPRESSION_LEVEL.uncompressed });
        await zip(testDir, testFilePath);

        const uncompressedSize = fs.statSync(testFilePathNoCompression).size;
        const defaultCompressedSize = fs.statSync(testFilePath).size;

        expect(defaultCompressedSize).toBeLessThanOrEqual(uncompressedSize);
    });
});