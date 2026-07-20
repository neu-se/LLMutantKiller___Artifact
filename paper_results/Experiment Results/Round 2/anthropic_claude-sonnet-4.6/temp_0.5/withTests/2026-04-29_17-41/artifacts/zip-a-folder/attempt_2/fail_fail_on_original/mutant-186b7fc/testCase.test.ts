import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder } from '../lib/ZipAFolder';

describe('tar uncompressed branch', () => {
    it('should create a plain tar (not gzip) when COMPRESSION_LEVEL.uncompressed is specified', async () => {
        const testDir = path.resolve(__dirname, '../test/data');
        const uncompressedTarPath = path.resolve(__dirname, '../test/mutation_detect_uncompressed.tar');

        try {
            await ZipAFolder.tar(testDir, uncompressedTarPath, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });

            expect(fs.existsSync(uncompressedTarPath)).toBe(true);

            // A plain tar file does NOT start with gzip magic bytes (0x1f 0x8b)
            // A gzip file always starts with these two bytes
            const buffer = Buffer.alloc(2);
            const fd = fs.openSync(uncompressedTarPath, 'r');
            fs.readSync(fd, buffer, 0, 2, 0);
            fs.closeSync(fd);

            const GZIP_MAGIC_BYTE_1 = 0x1f;
            const GZIP_MAGIC_BYTE_2 = 0x8b;

            // Original code: uncompressed tar - should NOT have gzip magic bytes
            // Mutated code: always uses gzip - WILL have gzip magic bytes
            expect(buffer[0]).not.toBe(GZIP_MAGIC_BYTE_1);
            expect(buffer[1]).not.toBe(GZIP_MAGIC_BYTE_2);
        } finally {
            if (fs.existsSync(uncompressedTarPath)) fs.unlinkSync(uncompressedTarPath);
        }
    });
});