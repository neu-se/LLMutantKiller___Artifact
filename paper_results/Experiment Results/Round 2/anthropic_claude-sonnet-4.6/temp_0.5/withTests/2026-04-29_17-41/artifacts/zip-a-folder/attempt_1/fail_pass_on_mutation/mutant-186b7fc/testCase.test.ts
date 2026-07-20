import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('tar uncompressed vs compressed size comparison', () => {
    it('should produce a larger file when using uncompressed tar compared to gzip compressed tar', async () => {
        const uncompressedTarPath = path.resolve(__dirname, 'test_uncompressed_mutation.tar');
        const compressedTarPath = path.resolve(__dirname, 'test_compressed_mutation.tgz');
        const srcDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');

        try {
            await ZipAFolder.tar(srcDir, uncompressedTarPath, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });

            await ZipAFolder.tar(srcDir, compressedTarPath, {
                compression: COMPRESSION_LEVEL.high,
            });

            const uncompressedSize = fs.statSync(uncompressedTarPath).size;
            const compressedSize = fs.statSync(compressedTarPath).size;

            // Uncompressed tar should be larger than gzip compressed tar
            expect(uncompressedSize).toBeGreaterThan(compressedSize);
        } finally {
            if (fs.existsSync(uncompressedTarPath)) {
                fs.unlinkSync(uncompressedTarPath);
            }
            if (fs.existsSync(compressedTarPath)) {
                fs.unlinkSync(compressedTarPath);
            }
        }
    });
});