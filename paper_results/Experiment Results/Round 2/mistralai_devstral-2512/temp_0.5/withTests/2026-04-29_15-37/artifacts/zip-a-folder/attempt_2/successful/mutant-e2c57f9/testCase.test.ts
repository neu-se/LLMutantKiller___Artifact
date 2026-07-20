'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder store option test', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const outputPath = path.resolve(__dirname, 'test-uncompressed.zip');

    beforeAll(() => {
        fs.mkdirSync(testDir, { recursive: true });
        fs.writeFileSync(path.join(testDir, 'test.txt'), 'test content');
    });

    afterAll(() => {
        rimraf.sync(testDir);
        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }
    });

    it('should create uncompressed zip with store option enabled', async () => {
        await ZipAFolder.zip(testDir, outputPath, {
            compression: COMPRESSION_LEVEL.uncompressed
        });

        expect(fs.existsSync(outputPath)).toBe(true);

        const zipContent = fs.readFileSync(outputPath);
        expect(zipContent.includes(Buffer.from('test content'))).toBe(true);
    });
});