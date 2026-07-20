import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimraf } from 'rimraf';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';

describe('ZipAFolder uncompressed zip store option', () => {
    it('should store files without compression (store: true) when using COMPRESSION_LEVEL.uncompressed', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipFilePath = path.join(tmpDir, 'output.zip');

        try {
            // Create source directory with compressible content
            fs.mkdirSync(srcDir, { recursive: true });
            // Write a file with highly compressible content (repeated text)
            const compressibleContent = 'AAAAAAAAAA'.repeat(1000);
            fs.writeFileSync(path.join(srcDir, 'test.txt'), compressibleContent);

            // Zip with uncompressed option
            await ZipAFolder.zip(srcDir, zipFilePath, { compression: COMPRESSION_LEVEL.uncompressed });

            // Read the zip file
            const zipBuffer = fs.readFileSync(zipFilePath);

            // In a ZIP file, local file header starts with signature 0x04034b50 (PK\x03\x04)
            // The compression method is at offset 8 from the start of the local file header (2 bytes, little-endian)
            // Compression method 0 = stored (no compression)
            // Compression method 8 = deflated

            // Find the local file header signature
            const signature = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
            let headerOffset = -1;
            for (let i = 0; i < zipBuffer.length - 4; i++) {
                if (zipBuffer[i] === signature[0] &&
                    zipBuffer[i + 1] === signature[1] &&
                    zipBuffer[i + 2] === signature[2] &&
                    zipBuffer[i + 3] === signature[3]) {
                    headerOffset = i;
                    break;
                }
            }

            expect(headerOffset).toBeGreaterThanOrEqual(0);

            // Compression method is at offset 8 from the start of the local file header
            const compressionMethod = zipBuffer.readUInt16LE(headerOffset + 8);

            // With store: true, compression method should be 0 (stored)
            // With store: false, compression method would be 8 (deflated)
            expect(compressionMethod).toBe(0);
        } finally {
            await rimraf(tmpDir);
        }
    });
});