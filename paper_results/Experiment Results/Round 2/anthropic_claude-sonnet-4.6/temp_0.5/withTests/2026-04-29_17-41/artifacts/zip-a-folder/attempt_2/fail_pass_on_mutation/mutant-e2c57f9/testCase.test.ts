'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder as zipafolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP uncompressed store option mutation test', () => {
    const testUncompressedZIP = path.resolve(__dirname, 'test_mutation_store.zip');
    const dataDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');

    afterAll(() => {
        if (fs.existsSync(testUncompressedZIP)) {
            fs.unlinkSync(testUncompressedZIP);
        }
    });

    it('uncompressed ZIP should use STORE compression method (method 0) in local file headers', async () => {
        await zipafolder.zip(dataDir, testUncompressedZIP, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });

        expect(fs.existsSync(testUncompressedZIP)).toBe(true);

        const buffer = fs.readFileSync(testUncompressedZIP);

        // ZIP local file header signature: PK\x03\x04
        // Compression method is at offset +8 from the signature (2 bytes, little-endian)
        // Method 0 = STORE (no compression), Method 8 = DEFLATE
        const localFileHeaderSig = Buffer.from([0x50, 0x4b, 0x03, 0x04]);

        let foundHeader = false;
        for (let i = 0; i <= buffer.length - localFileHeaderSig.length; i++) {
            if (
                buffer[i] === localFileHeaderSig[0] &&
                buffer[i + 1] === localFileHeaderSig[1] &&
                buffer[i + 2] === localFileHeaderSig[2] &&
                buffer[i + 3] === localFileHeaderSig[3]
            ) {
                // Compression method at offset +8 from start of local file header
                const compressionMethod = buffer.readUInt16LE(i + 8);
                // With store: true, method should be 0 (STORE)
                // With store: false (mutation), method would be 8 (DEFLATE)
                expect(compressionMethod).toBe(0);
                foundHeader = true;
                break;
            }
        }

        expect(foundHeader).toBe(true);
    });
});