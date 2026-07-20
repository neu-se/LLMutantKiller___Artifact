// <Jest test file containing exactly one test case>
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder.zip with uncompressed option', () => {
    it('should store files without deflate compression when COMPRESSION_LEVEL.uncompressed is specified', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipFile = path.join(tmpDir, 'output.zip');

        try {
            fs.mkdirSync(srcDir, { recursive: true });
            // Use highly compressible content to make compression method distinguishable
            const content = 'AAAAAAAAAA'.repeat(1000);
            fs.writeFileSync(path.join(srcDir, 'test.txt'), content);

            await ZipAFolder.zip(srcDir, zipFile, { compression: COMPRESSION_LEVEL.uncompressed });

            const zipBuffer = fs.readFileSync(zipFile);

            // Find the local file header signature 0x04034b50
            let offset = 0;
            while (offset < zipBuffer.length - 4) {
                if (zipBuffer.readUInt32LE(offset) === 0x04034b50) {
                    break;
                }
                offset++;
            }

            // Compression method is at offset + 8
            const compressionMethod = zipBuffer.readUInt16LE(offset + 8);

            // Original: store: true => compression method 0 (stored)
            // Mutated: zlib: {level: 0} => compression method 8 (deflated)
            expect(compressionMethod).toBe(0);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});