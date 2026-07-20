// <Jest test file containing exactly one test case>
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder.zip with uncompressed option', () => {
    it('should use store (no compression) when COMPRESSION_LEVEL.uncompressed is specified', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipFile = path.join(tmpDir, 'output.zip');

        try {
            // Create source directory with a test file
            fs.mkdirSync(srcDir, { recursive: true });
            fs.writeFileSync(path.join(srcDir, 'test.txt'), 'Hello World! This is a test file for zip compression testing.');

            // Zip with uncompressed option
            await ZipAFolder.zip(srcDir, zipFile, { compression: COMPRESSION_LEVEL.uncompressed });

            // Read the zip file and check the compression method
            const zipBuffer = fs.readFileSync(zipFile);

            // ZIP local file header starts with signature 0x04034b50
            // Bytes 8-9 (offset from signature start) are the compression method
            // 0 = stored (no compression), 8 = deflated
            const signature = zipBuffer.readUInt32LE(0);
            expect(signature).toBe(0x04034b50); // Verify it's a valid ZIP file

            // Compression method is at offset 8 from the start of the local file header
            const compressionMethod = zipBuffer.readUInt16LE(8);

            // Original code: should be 0 (stored/uncompressed)
            // Mutated code: will be 8 (deflated) because it always uses zlib
            expect(compressionMethod).toBe(0); // 0 = stored, no compression
        } finally {
            // Cleanup
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});