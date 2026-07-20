'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as archiver from 'archiver';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder uncompressed zip test', () => {
    const testOutputPath = path.resolve(__dirname, 'test-uncompressed.zip');
    const testDataPath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');

    beforeAll(() => {
        rimraf.sync(testOutputPath);
    });

    afterAll(() => {
        rimraf.sync(testOutputPath);
    });

    it('should verify uncompressed zip uses store method', async () => {
        await ZipAFolder.zip(testDataPath, testOutputPath, {
            compression: COMPRESSION_LEVEL.uncompressed
        });

        expect(fs.existsSync(testOutputPath)).toBe(true);

        const stats = fs.statSync(testOutputPath);
        expect(stats.size).toBeGreaterThan(0);

        // Verify the zip was created with store method by checking compression
        const zipFile = fs.readFileSync(testOutputPath);
        const zip = archiver.create('zip', { store: true });
        const output = fs.createWriteStream(path.resolve(__dirname, 'test-store-verification.zip'));
        zip.pipe(output);
        zip.directory(testDataPath, false);
        await zip.finalize();

        const storeZipFile = fs.readFileSync(path.resolve(__dirname, 'test-store-verification.zip'));
        expect(zipFile.length).toBe(storeZipFile.length);
        rimraf.sync(path.resolve(__dirname, 'test-store-verification.zip'));
    });
});