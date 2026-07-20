import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimraf } from 'rimraf';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';

describe('ZipAFolder.tar with uncompressed option', () => {
    it('should create an uncompressed tar (not gzipped) when COMPRESSION_LEVEL.uncompressed is specified', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-a-folder-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const outputFile = path.join(tmpDir, 'output.tar');

        try {
            // Create source directory with a file
            fs.mkdirSync(srcDir, { recursive: true });
            fs.writeFileSync(path.join(srcDir, 'test.txt'), 'hello world');

            // Create uncompressed tar
            await ZipAFolder.tar(srcDir, outputFile, { compression: COMPRESSION_LEVEL.uncompressed });

            // Read the first few bytes of the output file
            const fd = fs.openSync(outputFile, 'r');
            const buffer = Buffer.alloc(2);
            fs.readSync(fd, buffer, 0, 2, 0);
            fs.closeSync(fd);

            // Gzip magic bytes are 0x1f 0x8b
            // An uncompressed tar should NOT start with gzip magic bytes
            const isGzipped = buffer[0] === 0x1f && buffer[1] === 0x8b;
            expect(isGzipped).toBe(false);
        } finally {
            await rimraf(tmpDir);
        }
    });
});