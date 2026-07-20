import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as zlib from 'zlib';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';

describe('ZipAFolder.zip with COMPRESSION_LEVEL.uncompressed', () => {
    it('should produce a valid zip where files are stored uncompressed (store method), not deflated', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const outDir = path.join(tmpDir, 'out');
        fs.mkdirSync(srcDir);
        fs.mkdirSync(outDir);

        // Write a test file with highly compressible content
        const testContent = 'A'.repeat(1000);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), testContent);

        const zipUncompressed = path.join(outDir, 'uncompressed.zip');
        const zipCompressed = path.join(outDir, 'compressed.zip');

        try {
            // Create zip with uncompressed setting
            await ZipAFolder.zip(srcDir, zipUncompressed, { compression: COMPRESSION_LEVEL.uncompressed });
            // Create zip with high compression for comparison
            await ZipAFolder.zip(srcDir, zipCompressed, { compression: COMPRESSION_LEVEL.high });

            const uncompressedSize = fs.statSync(zipUncompressed).size;
            const compressedSize = fs.statSync(zipCompressed).size;

            // With store: true (original), the uncompressed zip should be LARGER than the compressed zip
            // because the file content (1000 'A's) is very compressible.
            // With the mutation (zlib level 0), the behavior might differ but we check the raw bytes.

            // Read both zip files and find local file headers to compare compression methods
            const uncompressedBuf = fs.readFileSync(zipUncompressed);
            const compressedBuf = fs.readFileSync(zipCompressed);

            // Find all local file headers and check compression methods
            const findCompressionMethods = (buf: Buffer): number[] => {
                const methods: number[] = [];
                for (let i = 0; i <= buf.length - 30; i++) {
                    if (buf[i] === 0x50 && buf[i+1] === 0x4B && buf[i+2] === 0x03 && buf[i+3] === 0x04) {
                        methods.push(buf.readUInt16LE(i + 8));
                    }
                }
                return methods;
            };

            const uncompressedMethods = findCompressionMethods(uncompressedBuf);
            const compressedMethods = findCompressionMethods(compressedBuf);

            // The compressed zip should use deflate (method 8)
            expect(compressedMethods.some(m => m === 8)).toBe(true);

            // The uncompressed zip (original) should use store (method 0) for all files
            // The mutated version with zlib:{level:0} - let's check what it actually does
            // by verifying the stored size equals the original file size
            
            // Find the local file header for test.txt and check compressed size field
            // In ZIP local file header: compressed size is at offset 18, uncompressed size at offset 22
            let foundHeader = false;
            for (let i = 0; i <= uncompressedBuf.length - 30; i++) {
                if (uncompressedBuf[i] === 0x50 && uncompressedBuf[i+1] === 0x4B && 
                    uncompressedBuf[i+2] === 0x03 && uncompressedBuf[i+3] === 0x04) {
                    const compressionMethod = uncompressedBuf.readUInt16LE(i + 8);
                    const compressedSizeInZip = uncompressedBuf.readUInt32LE(i + 18);
                    const uncompressedSizeInZip = uncompressedBuf.readUInt32LE(i + 22);
                    const fileNameLength = uncompressedBuf.readUInt16LE(i + 26);
                    const fileName = uncompressedBuf.slice(i + 30, i + 30 + fileNameLength).toString();
                    
                    if (fileName.includes('test.txt')) {
                        foundHeader = true;
                        // With store: true, compression method must be 0 (stored)
                        expect(compressionMethod).toBe(0);
                        // With store: true, compressed size equals uncompressed size
                        expect(compressedSizeInZip).toBe(uncompressedSizeInZip);
                        expect(uncompressedSizeInZip).toBe(testContent.length);
                        break;
                    }
                }
            }

            expect(foundHeader).toBe(true);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});