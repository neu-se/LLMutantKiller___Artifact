import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder zip with uncompressed level', () => {
    it('should pass store:true to archiver when COMPRESSION_LEVEL.uncompressed is used', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const testFile = path.join(tmpDir, 'test.txt');
        fs.writeFileSync(testFile, 'hello world test content');
        
        const uncompressedZip = path.join(os.tmpdir(), 'test_uncompressed_a.zip');
        const mediumZip = path.join(os.tmpdir(), 'test_medium_a.zip');

        try {
            await ZipAFolder.zip(tmpDir, uncompressedZip, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });
            await ZipAFolder.zip(tmpDir, mediumZip, {
                compression: COMPRESSION_LEVEL.medium,
            });

            const uncompressedBuffer = fs.readFileSync(uncompressedZip);
            const mediumBuffer = fs.readFileSync(mediumZip);

            // With store:true (original), archiver sets compression method to STORE (0)
            // With zlib:{level:0} (mutated), archiver sets compression method to DEFLATE (8)
            // With zlib:{level:5} (medium), archiver sets compression method to DEFLATE (8)
            // 
            // Key: if both uncompressed and medium use DEFLATE, their local file headers
            // will have method=8. If uncompressed uses STORE, method=0.
            // We can detect this by checking if the two zip files share the same 
            // compression method byte at the same header location.
            
            // Find first local file header in uncompressed zip
            let uncompressedMethod = -1;
            for (let i = 0; i <= uncompressedBuffer.length - 30; i++) {
                if (uncompressedBuffer[i] === 0x50 && uncompressedBuffer[i+1] === 0x4b &&
                    uncompressedBuffer[i+2] === 0x03 && uncompressedBuffer[i+3] === 0x04) {
                    uncompressedMethod = uncompressedBuffer.readUInt16LE(i + 8);
                    break;
                }
            }

            let mediumMethod = -1;
            for (let i = 0; i <= mediumBuffer.length - 30; i++) {
                if (mediumBuffer[i] === 0x50 && mediumBuffer[i+1] === 0x4b &&
                    mediumBuffer[i+2] === 0x03 && mediumBuffer[i+3] === 0x04) {
                    mediumMethod = mediumBuffer.readUInt16LE(i + 8);
                    break;
                }
            }

            // Original: uncompressed uses STORE (0), medium uses DEFLATE (8) - they differ
            // Mutated: both use DEFLATE (8) - they are the same
            expect(uncompressedMethod).not.toBe(mediumMethod);
        } finally {
            if (fs.existsSync(uncompressedZip)) fs.unlinkSync(uncompressedZip);
            if (fs.existsSync(mediumZip)) fs.unlinkSync(mediumZip);
            if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
            fs.rmdirSync(tmpDir, { recursive: true });
        }
    });
});