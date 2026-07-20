import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';

describe('ZipAFolder.zip with uncompressed level', () => {
    it('should create a zip file when compression level is uncompressed', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const outputZip = path.join(tmpDir, 'output.zip');

        try {
            // Create source directory with a test file
            fs.mkdirSync(srcDir, { recursive: true });
            fs.writeFileSync(path.join(srcDir, 'test.txt'), 'Hello, World!');

            // Zip with uncompressed level
            await ZipAFolder.zip(srcDir, outputZip, { compression: COMPRESSION_LEVEL.uncompressed });

            // The zip file should exist and have content
            const exists = fs.existsSync(outputZip);
            expect(exists).toBe(true);

            const stats = fs.statSync(outputZip);
            expect(stats.size).toBeGreaterThan(0);
        } finally {
            // Cleanup
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});