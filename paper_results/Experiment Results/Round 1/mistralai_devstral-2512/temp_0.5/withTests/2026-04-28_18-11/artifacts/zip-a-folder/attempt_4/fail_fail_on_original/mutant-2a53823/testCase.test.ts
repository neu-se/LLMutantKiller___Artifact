'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, tar } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Tar with uncompressed compression level', () => {
    const testFolder = path.resolve(__dirname, '../subject_repositories/zip-a-folder/test/data');
    const outputPath = path.resolve(__dirname, '../subject_repositories/zip-a-folder/test/test-uncompressed.tar');

    afterEach(() => {
        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }
    });

    it('should create an uncompressed tar file when compression level is set to uncompressed', async () => {
        await tar(testFolder, outputPath, { compression: COMPRESSION_LEVEL.uncompressed });
        expect(fs.existsSync(outputPath)).toBe(true);
    });
});