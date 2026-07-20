import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { zip, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";

describe('ZipAFolder compression options test', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const testFilePath = path.resolve(__dirname, 'test-compression.zip');

    beforeAll(() => {
        fs.mkdirSync(testDir, { recursive: true });
        fs.writeFileSync(path.join(testDir, 'file1.txt'), 'content1'.repeat(1000));
    });

    afterAll(() => {
        rimraf.sync(testDir);
        rimraf.sync(testFilePath);
    });

    it('should throw error when compression level is invalid', async () => {
        await expect(zip(testDir, testFilePath, { compression: -1 as COMPRESSION_LEVEL })).rejects.toThrow();
    });
});