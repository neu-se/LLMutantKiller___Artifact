import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('tar uncompressed mutation detection', () => {
    it('should create a non-gzip-compressed tar file when COMPRESSION_LEVEL.uncompressed is specified', async () => {
        const testDataDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');
        const uncompressedTar = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/mutant_detect_uncompressed.tar');

        if (fs.existsSync(uncompressedTar)) fs.unlinkSync(uncompressedTar);

        await ZipAFolder.tar(testDataDir, uncompressedTar, { compression: COMPRESSION_LEVEL.uncompressed });

        expect(fs.existsSync(uncompressedTar)).toBe(true);

        // Read the first two bytes to check for gzip magic number (0x1f, 0x8b)
        const buffer = Buffer.alloc(2);
        const fd = fs.openSync(uncompressedTar, 'r');
        fs.readSync(fd, buffer, 0, 2, 0);
        fs.closeSync(fd);

        // An uncompressed tar should NOT start with gzip magic bytes
        const isGzip = buffer[0] === 0x1f && buffer[1] === 0x8b;
        expect(isGzip).toBe(false);

        if (fs.existsSync(uncompressedTar)) fs.unlinkSync(uncompressedTar);
    });
});