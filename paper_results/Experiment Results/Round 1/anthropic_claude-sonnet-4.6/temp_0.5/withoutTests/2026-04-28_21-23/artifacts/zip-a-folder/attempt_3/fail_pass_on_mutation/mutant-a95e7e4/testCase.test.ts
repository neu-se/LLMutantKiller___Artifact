// <Jest test file containing exactly one test case>
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder.zip with uncompressed option', () => {
    it('should produce identical compressed and uncompressed sizes when store mode is used', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipFile = path.join(tmpDir, 'output.zip');

        try {
            fs.mkdirSync(srcDir, { recursive: true });
            // Highly compressible content
            const content = 'A'.repeat(10000);
            fs.writeFileSync(path.join(srcDir, 'test.txt'), content);

            await ZipAFolder.zip(srcDir, zipFile, { compression: COMPRESSION_LEVEL.uncompressed });

            const zipBuffer = fs.readFileSync(zipFile);

            // Find local file header signature 0x04034b50
            let offset = -1;
            for (let i = 0; i < zipBuffer.length - 4; i++) {
                if (zipBuffer.readUInt32LE(i) === 0x04034b50) {
                    offset = i;
                    break;
                }
            }
            expect(offset).toBeGreaterThanOrEqual(0);

            const compressionMethod = zipBuffer.readUInt16LE(offset + 8);
            const compressedSize = zipBuffer.readUInt32LE(offset + 18);
            const uncompressedSize = zipBuffer.readUInt32LE(offset + 22);

            // With store: true (original), compressed size == uncompressed size
            // With zlib level 0 (mutated), sizes may differ due to deflate overhead
            // Also check method: 0 = stored, 8 = deflated
            expect(compressionMethod).toBe(0);
            expect(compressedSize).toBe(uncompressedSize);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});