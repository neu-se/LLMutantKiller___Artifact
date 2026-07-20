import { tar } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';

describe('ZipAFolder', () => {
    it('should create a tar archive when compression level is uncompressed', async () => {
        const src = 'test-data';
        const tarFilePath = 'test-data.tar';
        const compressionLevel = 0;

        // Create test data
        if (!fs.existsSync(src)) {
            fs.mkdirSync(src);
        }
        fs.writeFileSync(path.join(src, 'test.txt'), 'Hello, World!');

        try {
            await tar(src, tarFilePath, { compression: compressionLevel });
            expect(fs.existsSync(tarFilePath)).toBe(true);
            const stats = fs.statSync(tarFilePath);
            expect(stats.size).toBeGreaterThan(0);
        } finally {
            if (fs.existsSync(tarFilePath)) {
                fs.unlinkSync(tarFilePath);
            }
            if (fs.existsSync(path.join(src, 'test.txt'))) {
                fs.unlinkSync(path.join(src, 'test.txt'));
            }
            if (fs.existsSync(src)) {
                fs.rmdirSync(src);
            }
        }
    });
});