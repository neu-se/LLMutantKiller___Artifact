import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';

describe('ZipAFolder.zip with COMPRESSION_LEVEL.uncompressed', () => {
    it('should create an uncompressed (stored) zip when compression level is uncompressed', async () => {
        // Create a temp directory with a test file
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const outDir = path.join(tmpDir, 'out');
        fs.mkdirSync(srcDir);
        fs.mkdirSync(outDir);

        // Write a test file with known content
        const testContent = 'Hello, World! This is test content for zip compression test.';
        fs.writeFileSync(path.join(srcDir, 'test.txt'), testContent);

        const zipFilePath = path.join(outDir, 'output.zip');

        try {
            await ZipAFolder.zip(srcDir, zipFilePath, { compression: COMPRESSION_LEVEL.uncompressed });

            // Read the zip file bytes to check compression method
            const zipBuffer = fs.readFileSync(zipFilePath);

            // In a ZIP file, the local file header starts at offset 0 with signature 0x504B0304
            // The compression method is at bytes 8-9 (little-endian)
            // 0 = stored (no compression), 8 = deflated (compressed)
            
            // Find the local file header signature: PK\x03\x04
            const pkSignature = Buffer.from([0x50, 0x4B, 0x03, 0x04]);
            let headerOffset = -1;
            for (let i = 0; i <= zipBuffer.length - 4; i++) {
                if (zipBuffer[i] === pkSignature[0] &&
                    zipBuffer[i+1] === pkSignature[1] &&
                    zipBuffer[i+2] === pkSignature[2] &&
                    zipBuffer[i+3] === pkSignature[3]) {
                    headerOffset = i;
                    break;
                }
            }

            expect(headerOffset).toBeGreaterThanOrEqual(0);

            // Compression method is at offset 8 from the local file header
            const compressionMethod = zipBuffer.readUInt16LE(headerOffset + 8);

            // With COMPRESSION_LEVEL.uncompressed, compression method should be 0 (stored)
            // With the mutation (if false), it would use zlib and compression method would be 8 (deflated)
            expect(compressionMethod).toBe(0);
        } finally {
            // Cleanup
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});