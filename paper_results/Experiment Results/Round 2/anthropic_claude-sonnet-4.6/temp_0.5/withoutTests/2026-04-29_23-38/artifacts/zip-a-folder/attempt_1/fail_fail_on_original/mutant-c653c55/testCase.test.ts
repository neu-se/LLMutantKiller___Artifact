import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';

describe('ZipAFolder zip compression options', () => {
    it('should create a zip with store (no compression) when using default high compression level', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipPath = path.join(tmpDir, 'output.zip');

        fs.mkdirSync(srcDir);
        // Create a file with highly compressible content
        const compressibleContent = 'A'.repeat(10000);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), compressibleContent);

        await ZipAFolder.zip(srcDir, zipPath, { compression: COMPRESSION_LEVEL.high });

        // Read the zip file and check the compression method
        // In a zip file, local file header at offset 8 contains compression method (2 bytes)
        // Method 0 = stored (no compression), Method 8 = deflated
        const zipBuffer = fs.readFileSync(zipPath);
        
        // Local file header signature: PK\x03\x04
        // After signature (4 bytes), version needed (2), general purpose bit flag (2), 
        // compression method is at offset 8 from start of local file header
        const localFileHeaderSig = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
        let headerOffset = -1;
        for (let i = 0; i < zipBuffer.length - 4; i++) {
            if (zipBuffer[i] === localFileHeaderSig[0] &&
                zipBuffer[i+1] === localFileHeaderSig[1] &&
                zipBuffer[i+2] === localFileHeaderSig[2] &&
                zipBuffer[i+3] === localFileHeaderSig[3]) {
                headerOffset = i;
                break;
            }
        }

        expect(headerOffset).toBeGreaterThanOrEqual(0);
        
        // Compression method is at offset 8 from the local file header start
        const compressionMethod = zipBuffer.readUInt16LE(headerOffset + 8);
        
        // Original code uses store: true, so compression method should be 0 (stored)
        // Mutated code uses {}, so archiver uses deflate (method 8)
        expect(compressionMethod).toBe(0); // stored = no compression

        // Cleanup
        fs.rmSync(tmpDir, { recursive: true });
    });
});