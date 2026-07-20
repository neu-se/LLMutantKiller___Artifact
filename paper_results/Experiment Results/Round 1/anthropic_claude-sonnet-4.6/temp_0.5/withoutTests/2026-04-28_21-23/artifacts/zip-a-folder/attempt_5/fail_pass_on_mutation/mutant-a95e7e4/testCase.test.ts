// <Jest test file containing exactly one test case>
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder.zip', () => {
    it('should use store method in central directory when COMPRESSION_LEVEL.uncompressed is specified', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipFile = path.join(tmpDir, 'output.zip');

        try {
            fs.mkdirSync(srcDir, { recursive: true });
            fs.writeFileSync(path.join(srcDir, 'test.txt'), 'A'.repeat(10000));

            await ZipAFolder.zip(srcDir, zipFile, { compression: COMPRESSION_LEVEL.uncompressed });

            const zipBuffer = fs.readFileSync(zipFile);

            // Find End of Central Directory record (signature 0x06054b50)
            let eocdOffset = -1;
            for (let i = zipBuffer.length - 22; i >= 0; i--) {
                if (zipBuffer.readUInt32LE(i) === 0x06054b50) {
                    eocdOffset = i;
                    break;
                }
            }
            expect(eocdOffset).toBeGreaterThanOrEqual(0);

            // Central directory offset is at EOCD + 16
            const cdOffset = zipBuffer.readUInt32LE(eocdOffset + 16);

            // Central directory file header signature is 0x02014b50
            expect(zipBuffer.readUInt32LE(cdOffset)).toBe(0x02014b50);

            // Compression method in central directory is at offset + 10
            const compressionMethod = zipBuffer.readUInt16LE(cdOffset + 10);

            // Original (store: true): method 0
            // Mutated (zlib level 0): method 8 (deflate)
            expect(compressionMethod).toBe(0);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});