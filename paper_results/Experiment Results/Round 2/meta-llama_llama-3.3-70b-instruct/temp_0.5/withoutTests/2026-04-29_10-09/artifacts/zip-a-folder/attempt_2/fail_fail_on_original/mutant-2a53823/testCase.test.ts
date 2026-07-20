import { tar } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import { rm } from 'rimraf';
import { expect } from 'jest-extended';

describe('ZipAFolder', () => {
    it('should create a tar archive when compression level is high', async () => {
        const src = 'test-data';
        const tarFilePath = 'test-data.tar';
        const compressionLevel = 9;

        // Create test data
        fs.mkdirSync(src);
        fs.writeFileSync(path.join(src, 'test.txt'), 'Hello, World!');

        try {
            await tar(src, tarFilePath, { compression: compressionLevel });
            expect(fs.existsSync(tarFilePath)).toBe(true);
            const stats = fs.statSync(tarFilePath);
            expect(stats.size).toBeGreaterThan(0);
        } finally {
            rm([src, tarFilePath], (err: any) => {
                if (err) {
                    throw err;
                }
            });
        }
    });
});