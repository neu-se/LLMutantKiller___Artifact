'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { tar, COMPRESSION_LEVEL } from '../../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder tar uncompressed test', () => {
    const testDir = path.resolve(__dirname, 'data');
    const testTarPath = path.resolve(__dirname, 'test_uncompressed.tar');

    afterEach(() => {
        if (fs.existsSync(testTarPath)) {
            fs.unlinkSync(testTarPath);
        }
    });

    it('should create an uncompressed tar file when compression is set to uncompressed', async () => {
        await tar(testDir, testTarPath, { compression: COMPRESSION_LEVEL.uncompressed });
        expect(fs.existsSync(testTarPath)).toBe(true);

        const fileSize = fs.statSync(testTarPath).size;
        expect(fileSize).toBeGreaterThan(0);
    });
});