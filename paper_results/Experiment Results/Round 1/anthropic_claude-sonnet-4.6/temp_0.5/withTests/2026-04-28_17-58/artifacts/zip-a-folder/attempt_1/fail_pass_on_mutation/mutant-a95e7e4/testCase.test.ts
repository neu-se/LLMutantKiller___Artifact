import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder uncompressed zip behavior', () => {
    it('should produce a larger file when using uncompressed level compared to high compression', async () => {
        const testDataDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');
        const uncompressedZipPath = path.resolve(__dirname, 'test_uncompressed_mutation.zip');
        const compressedZipPath = path.resolve(__dirname, 'test_compressed_mutation.zip');

        try {
            await ZipAFolder.zip(testDataDir, uncompressedZipPath, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });

            await ZipAFolder.zip(testDataDir, compressedZipPath, {
                compression: COMPRESSION_LEVEL.high,
            });

            const uncompressedSize = fs.statSync(uncompressedZipPath).size;
            const compressedSize = fs.statSync(compressedZipPath).size;

            // Uncompressed zip should be larger than compressed zip
            // With the mutation (if (false)), uncompressed will actually use zlib compression
            // making it similar in size to compressed, causing this assertion to fail
            expect(uncompressedSize).toBeGreaterThan(compressedSize);
        } finally {
            if (fs.existsSync(uncompressedZipPath)) {
                fs.unlinkSync(uncompressedZipPath);
            }
            if (fs.existsSync(compressedZipPath)) {
                fs.unlinkSync(compressedZipPath);
            }
        }
    });
});