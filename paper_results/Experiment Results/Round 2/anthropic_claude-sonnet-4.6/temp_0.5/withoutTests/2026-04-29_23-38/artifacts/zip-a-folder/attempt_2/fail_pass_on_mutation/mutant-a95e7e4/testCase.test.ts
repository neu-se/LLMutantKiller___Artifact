import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';

describe('ZipAFolder.zip with COMPRESSION_LEVEL.uncompressed', () => {
    it('should use store method (compression method 0) when compression level is uncompressed', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const outDir = path.join(tmpDir, 'out');
        fs.mkdirSync(srcDir);
        fs.mkdirSync(outDir);

        // Write a test file with compressible content
        const testContent = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
        fs.writeFileSync(path.join(srcDir, 'test.txt'), testContent);

        const zipFilePath = path.join(outDir, 'output.zip');

        try {
            await ZipAFolder.zip(srcDir, zipFilePath, { compression: COMPRESSION_LEVEL.uncompressed });

            const zipBuffer = fs.readFileSync(zipFilePath);

            // Find the local file header signature: PK\x03\x04 (0x504B0304)
            let headerOffset = -1;
            for (let i = 0; i <= zipBuffer.length - 4; i++) {
                if (zipBuffer[i] === 0x50 &&
                    zipBuffer[i+1] === 0x4B &&
                    zipBuffer[i+2] === 0x03 &&
                    zipBuffer[i+3] === 0x04) {
                    headerOffset = i;
                    break;
                }
            }

            expect(headerOffset).toBeGreaterThanOrEqual(0);

            // Compression method is at offset 8 from the local file header start
            // 0 = stored (no compression), 8 = deflated
            const compressionMethod = zipBuffer.readUInt16LE(headerOffset + 8);

            // Original code: store: true → compression method should be 0 (stored)
            // Mutated code: zlib: { level: 0 } → compression method will be 8 (deflated, even at level 0)
            expect(compressionMethod).toBe(0);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});