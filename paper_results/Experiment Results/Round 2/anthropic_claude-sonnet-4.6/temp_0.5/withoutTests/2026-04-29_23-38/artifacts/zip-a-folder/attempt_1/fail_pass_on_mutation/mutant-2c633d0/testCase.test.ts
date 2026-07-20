import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';

describe('ZipAFolder.tar default compression', () => {
    it('should use high compression level by default when no options are provided to tar', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-a-folder-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const highCompressedFile = path.join(tmpDir, 'high.tar.gz');
        const noOptionsFile = path.join(tmpDir, 'default.tar.gz');

        try {
            // Create source directory with compressible content
            fs.mkdirSync(srcDir);
            // Write a file with highly compressible content
            const content = 'AAAAAAAAAA'.repeat(10000);
            fs.writeFileSync(path.join(srcDir, 'test.txt'), content);

            // Create tar with explicit high compression
            await ZipAFolder.tar(srcDir, highCompressedFile, { compression: COMPRESSION_LEVEL.high });

            // Create tar with no options (should default to high compression)
            await ZipAFolder.tar(srcDir, noOptionsFile);

            const highSize = fs.statSync(highCompressedFile).size;
            const defaultSize = fs.statSync(noOptionsFile).size;

            // Both should produce similarly sized files since both should use high compression
            // The difference should be small (within 10% of each other)
            const ratio = Math.abs(defaultSize - highSize) / highSize;
            expect(ratio).toBeLessThan(0.1);

            // Also verify the default compression is actually compressing well
            // by comparing against uncompressed
            const uncompressedFile = path.join(tmpDir, 'uncompressed.tar');
            await ZipAFolder.tar(srcDir, uncompressedFile, { compression: COMPRESSION_LEVEL.uncompressed });
            const uncompressedSize = fs.statSync(uncompressedFile).size;

            // Default (high compression) should be significantly smaller than uncompressed
            expect(defaultSize).toBeLessThan(uncompressedSize * 0.5);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});