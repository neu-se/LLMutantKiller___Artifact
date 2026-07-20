import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';

describe('ZipAFolder tar with uncompressed level', () => {
    it('should create an uncompressed tar (not gzipped) when COMPRESSION_LEVEL.uncompressed is specified', async () => {
        // Create a temp directory with a test file
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-a-folder-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const outputFile = path.join(tmpDir, 'output.tar');

        try {
            fs.mkdirSync(srcDir, { recursive: true });
            fs.writeFileSync(path.join(srcDir, 'test.txt'), 'hello world');

            await ZipAFolder.tar(srcDir, outputFile, { compression: COMPRESSION_LEVEL.uncompressed });

            // Read the first two bytes of the output file
            const buffer = Buffer.alloc(2);
            const fd = fs.openSync(outputFile, 'r');
            fs.readSync(fd, buffer, 0, 2, 0);
            fs.closeSync(fd);

            // Gzip magic bytes are 0x1f 0x8b
            // An uncompressed tar should NOT start with gzip magic bytes
            const isGzipped = buffer[0] === 0x1f && buffer[1] === 0x8b;
            expect(isGzipped).toBe(false);

            // Also verify the file exists and has content
            const stats = fs.statSync(outputFile);
            expect(stats.size).toBeGreaterThan(0);
        } finally {
            // Cleanup
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});