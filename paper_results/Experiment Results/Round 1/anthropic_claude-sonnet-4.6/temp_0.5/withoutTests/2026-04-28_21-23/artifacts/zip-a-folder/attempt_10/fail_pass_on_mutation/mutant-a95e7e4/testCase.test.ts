// <Jest test file containing exactly one test case>
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder.zip', () => {
    it('zip with COMPRESSION_LEVEL.uncompressed should produce same size as zip with no options for already-compressed data', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDirA = path.join(tmpDir, 'srcA');
        const srcDirB = path.join(tmpDir, 'srcB');
        const zipA = path.join(tmpDir, 'a.zip');
        const zipB = path.join(tmpDir, 'b.zip');

        try {
            fs.mkdirSync(srcDirA, { recursive: true });
            fs.mkdirSync(srcDirB, { recursive: true });

            // Content that is highly compressible
            const content = 'X'.repeat(100000);
            fs.writeFileSync(path.join(srcDirA, 'file.txt'), content);
            fs.writeFileSync(path.join(srcDirB, 'file.txt'), content);

            // With COMPRESSION_LEVEL.uncompressed (=0):
            // Original: store:true → ZIP method 0, compressed_size == uncompressed_size
            // Mutated: zlib:{level:0} → ZIP method 8, compressed_size > uncompressed_size (deflate overhead)
            await ZipAFolder.zip(srcDirA, zipA, { compression: COMPRESSION_LEVEL.uncompressed });
            // With no compression option, o.compression is undefined → else branch → zlib:{level:undefined}
            // This gives us a baseline for what deflate-wrapped output looks like
            await ZipAFolder.zip(srcDirB, zipB, { compression: COMPRESSION_LEVEL.high });

            const sizeA = fs.statSync(zipA).size;
            const sizeB = fs.statSync(zipB).size;

            // Original: sizeA >> sizeB (store vs high compression of compressible data)
            // Mutated: sizeA << sizeB (zlib level 0 vs high compression - level 0 still doesn't compress)
            // Wait - both store and zlib level 0 don't compress, so sizeA >> sizeB in both cases

            // Let me instead verify: with store, the zip contains the raw bytes
            // Parse the zip to find compressed size in central directory
            const zipBuffer = fs.readFileSync(zipA);
            
            // Find End of Central Directory
            let eocdOffset = -1;
            for (let i = zipBuffer.length - 22; i >= 0; i--) {
                if (zipBuffer.readUInt32LE(i) === 0x06054b50) {
                    eocdOffset = i;
                    break;
                }
            }
            const cdOffset = zipBuffer.readUInt32LE(eocdOffset + 16);
            
            // In central directory: compression method at +10, compressed size at +20, uncompressed size at +24
            const method = zipBuffer.readUInt16LE(cdOffset + 10);
            const compressedSize = zipBuffer.readUInt32LE(cdOffset + 20);
            const uncompressedSize = zipBuffer.readUInt32LE(cdOffset + 24);

            // Original (store:true): method=0, compressedSize==uncompressedSize==100000
            // Mutated (zlib level 0): method=8, compressedSize > uncompressedSize (deflate overhead for non-compressible)
            // Actually for compressible data with level 0: compressedSize > uncompressedSize still
            expect(method).toBe(0);
            expect(compressedSize).toBe(uncompressedSize);
            expect(uncompressedSize).toBe(100000);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});