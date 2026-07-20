'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder tar with uncompressed compression level', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const outputFile = path.resolve(__dirname, 'test-uncompressed.tar');

    beforeAll(async () => {
        await fs.promises.mkdir(testDir, { recursive: true });
        await fs.promises.writeFile(path.join(testDir, 'test.txt'), 'test content');
    });

    afterAll(async () => {
        await fs.promises.rm(outputFile, { force: true });
        await fs.promises.rm(testDir, { recursive: true, force: true });
    });

    it('should use uncompressed mode when compression level is set to uncompressed', async () => {
        const archiveSpy = jest.spyOn(require('archiver'), 'archiver');
        await ZipAFolder.tar(testDir, outputFile, { compression: COMPRESSION_LEVEL.uncompressed });
        expect(archiveSpy).toHaveBeenCalledWith('tar', { gzip: false });
        archiveSpy.mockRestore();
    });
});