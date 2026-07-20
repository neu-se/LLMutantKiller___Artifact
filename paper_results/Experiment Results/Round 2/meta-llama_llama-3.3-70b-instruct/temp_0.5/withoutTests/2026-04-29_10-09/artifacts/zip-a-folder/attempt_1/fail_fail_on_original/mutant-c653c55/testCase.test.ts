import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';
import * as fs from 'fs';
import * as path from 'path';
import { rm } from 'rimraf';
import { expect } from 'jest-extended';

describe('ZipAFolder', () => {
    it('should create a zip file with store compression when no compression level is specified', async () => {
        const src = './test-data';
        const zipFilePath = './test-data.zip';
        await ZipAFolder.zip(src, zipFilePath);
        const stats = fs.statSync(zipFilePath);
        const fileSize = stats.size;
        expect(fileSize).toBeGreaterThan(0);
        await rm(zipFilePath);
    });
});