import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder uncompressed zip uses STORE method', () => {
    it('should write zip entries using STORE compression method (0x00) when COMPRESSION_LEVEL.uncompressed is used', async () => {
        const testDataDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');
        const uncompressedZipPath = path.resolve(__dirname, 'test_store_method_detection.zip');

        try {
            await ZipAFolder.zip(testDataDir, uncompressedZipPath, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });

            const zipBuffer = fs.readFileSync(uncompressedZipPath);
            // ZIP local file header signature: PK\x03\x04
            // Compression method is at offset 8 (2 bytes, little-endian)
            // Method 0 = STORE, Method 8 = DEFLATE
            const PK_SIGNATURE = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
            
            let offset = 0;
            let foundDeflate = false;
            
            while (offset < zipBuffer.length - 4) {
                if (zipBuffer[offset] === PK_SIGNATURE[0] &&
                    zipBuffer[offset + 1] === PK_SIGNATURE[1] &&
                    zipBuffer[offset + 2] === PK_SIGNATURE[2] &&
                    zipBuffer[offset + 3] === PK_SIGNATURE[3]) {
                    // Compression method at offset + 8
                    const compressionMethod = zipBuffer.readUInt16LE(offset + 8);
                    if (compressionMethod === 8) { // DEFLATE
                        foundDeflate = true;
                        break;
                    }
                    // Skip past this header
                    const fileNameLength = zipBuffer.readUInt16LE(offset + 26);
                    const extraFieldLength = zipBuffer.readUInt16LE(offset + 28);
                    const compressedSize = zipBuffer.readUInt32LE(offset + 18);
                    offset += 30 + fileNameLength + extraFieldLength + compressedSize;
                } else {
                    offset++;
                }
            }
            
            // Original: store:true means STORE method (0), no DEFLATE entries
            // Mutated: zlib:{level:0} means DEFLATE method (8) entries exist
            expect(foundDeflate).toBe(false);
        } finally {
            if (fs.existsSync(uncompressedZipPath)) fs.unlinkSync(uncompressedZipPath);
        }
    });
});