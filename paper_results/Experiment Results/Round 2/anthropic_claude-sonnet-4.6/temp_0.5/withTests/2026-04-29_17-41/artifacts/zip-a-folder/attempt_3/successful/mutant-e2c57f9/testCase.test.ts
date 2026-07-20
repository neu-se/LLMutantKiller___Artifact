'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder as zipafolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP store mutation detection', () => {
    const testUncompressedZIP = path.resolve(__dirname, 'test_store_mutation.zip');
    const dataDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');

    afterAll(() => {
        if (fs.existsSync(testUncompressedZIP)) {
            fs.unlinkSync(testUncompressedZIP);
        }
    });

    it('uncompressed ZIP entries should have equal compressed and uncompressed sizes (STORE method)', async () => {
        await zipafolder.zip(dataDir, testUncompressedZIP, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });

        expect(fs.existsSync(testUncompressedZIP)).toBe(true);

        const buffer = fs.readFileSync(testUncompressedZIP);

        // Find central directory end record to locate central directory
        // End of central directory signature: PK\x05\x06
        const eocdSig = Buffer.from([0x50, 0x4b, 0x05, 0x06]);
        let eocdOffset = -1;
        for (let i = buffer.length - 22; i >= 0; i--) {
            if (
                buffer[i] === eocdSig[0] &&
                buffer[i + 1] === eocdSig[1] &&
                buffer[i + 2] === eocdSig[2] &&
                buffer[i + 3] === eocdSig[3]
            ) {
                eocdOffset = i;
                break;
            }
        }

        expect(eocdOffset).toBeGreaterThan(-1);

        const cdOffset = buffer.readUInt32LE(eocdOffset + 16);
        const cdSize = buffer.readUInt32LE(eocdOffset + 12);
        const totalEntries = buffer.readUInt16LE(eocdOffset + 10);

        // Parse central directory entries
        // Central directory file header signature: PK\x01\x02
        const cdSig = Buffer.from([0x50, 0x4b, 0x01, 0x02]);
        let offset = cdOffset;
        let fileEntryCount = 0;

        for (let entry = 0; entry < totalEntries; entry++) {
            if (
                buffer[offset] === cdSig[0] &&
                buffer[offset + 1] === cdSig[1] &&
                buffer[offset + 2] === cdSig[2] &&
                buffer[offset + 3] === cdSig[3]
            ) {
                const compressionMethod = buffer.readUInt16LE(offset + 10);
                const compressedSize = buffer.readUInt32LE(offset + 20);
                const uncompressedSize = buffer.readUInt32LE(offset + 24);
                const fileNameLength = buffer.readUInt16LE(offset + 28);
                const extraFieldLength = buffer.readUInt16LE(offset + 30);
                const commentLength = buffer.readUInt16LE(offset + 32);

                // Only check actual files (non-zero uncompressed size)
                if (uncompressedSize > 0) {
                    // store: true means method 0 (STORE) and compressedSize === uncompressedSize
                    expect(compressionMethod).toBe(0);
                    expect(compressedSize).toBe(uncompressedSize);
                    fileEntryCount++;
                }

                offset += 46 + fileNameLength + extraFieldLength + commentLength;
            }
        }

        // Make sure we actually checked some file entries
        expect(fileEntryCount).toBeGreaterThan(0);
    });
});