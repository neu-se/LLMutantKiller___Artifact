import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts";

describe('ZipAFolder.tar with uncompressed level', () => {
    it('should create a tar file when compression level is uncompressed', async () => {
        // Create a temporary directory with some files
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-a-folder-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const outputFile = path.join(tmpDir, 'output.tar.gz');

        try {
            // Create source directory with a test file
            fs.mkdirSync(srcDir, { recursive: true });
            fs.writeFileSync(path.join(srcDir, 'test.txt'), 'Hello, World!');

            // Call tar with uncompressed compression level
            await ZipAFolder.tar(srcDir, outputFile, { compression: COMPRESSION_LEVEL.uncompressed });

            // The output file should exist and have content
            const stats = fs.statSync(outputFile);
            expect(stats.isFile()).toBe(true);
            expect(stats.size).toBeGreaterThan(0);
        } finally {
            // Cleanup
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});