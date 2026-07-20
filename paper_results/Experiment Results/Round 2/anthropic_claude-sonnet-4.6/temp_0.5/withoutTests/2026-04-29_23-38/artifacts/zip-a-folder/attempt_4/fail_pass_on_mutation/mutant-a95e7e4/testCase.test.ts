import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder.zip with COMPRESSION_LEVEL.uncompressed', () => {
    it('should use store method (no compression) when COMPRESSION_LEVEL.uncompressed is specified', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const outDir = path.join(tmpDir, 'out');
        fs.mkdirSync(srcDir);
        fs.mkdirSync(outDir);

        // Write a highly compressible test file
        const testContent = 'A'.repeat(1000);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), testContent);

        const zipFilePath = path.join(outDir, 'output.zip');

        try {
            await ZipAFolder.zip(srcDir, zipFilePath, { compression: COMPRESSION_LEVEL.uncompressed });

            const zipBuffer = fs.readFileSync(zipFilePath);

            // Find the local file header for test.txt and check compression method
            // Local file header signature: PK\x03\x04
            // Compression method is at offset 8 from the header start (2 bytes, little-endian)
            // 0 = stored (no compression), 8 = deflated
            let compressionMethod: number | null = null;
            for (let i = 0; i <= zipBuffer.length - 30; i++) {
                if (zipBuffer[i] === 0x50 && zipBuffer[i+1] === 0x4B &&
                    zipBuffer[i+2] === 0x03 && zipBuffer[i+3] === 0x04) {
                    const fileNameLength = zipBuffer.readUInt16LE(i + 26);
                    const extraFieldLength = zipBuffer.readUInt16LE(i + 28);
                    const fileName = zipBuffer.slice(i + 30, i + 30 + fileNameLength).toString();

                    if (fileName.endsWith('test.txt')) {
                        compressionMethod = zipBuffer.readUInt16LE(i + 8);
                        break;
                    }
                }
            }

            expect(compressionMethod).not.toBeNull();
            // Original code uses store: true → compression method 0 (stored)
            // Mutated code (if false branch) uses zlib: { level: 0 } → compression method 8 (deflated)
            expect(compressionMethod).toBe(0);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});