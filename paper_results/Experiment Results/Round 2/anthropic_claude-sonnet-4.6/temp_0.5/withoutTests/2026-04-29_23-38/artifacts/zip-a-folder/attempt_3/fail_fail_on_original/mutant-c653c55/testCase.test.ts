import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder zip store option behavior', () => {
    it('should store files uncompressed when store:true is set in archiverOptions', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipPath = path.join(tmpDir, 'output.zip');

        fs.mkdirSync(srcDir);
        // Create a file with pseudo-random (incompressible) content
        // Using a pattern that won't compress well
        const buf = Buffer.alloc(10000);
        for (let i = 0; i < buf.length; i++) {
            buf[i] = (i * 37 + 13) % 256;
        }
        fs.writeFileSync(path.join(srcDir, 'test.bin'), buf);

        await ZipAFolder.zip(srcDir, zipPath, { compression: COMPRESSION_LEVEL.high });

        const zipBuffer = fs.readFileSync(zipPath);

        // Find the local file header for the actual file (not directory entries)
        // Local file header: PK\x03\x04
        // At offset 8 from header start: compression method (2 bytes LE)
        // Method 0 = stored, Method 8 = deflated
        const sig = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
        
        let compressionMethods: number[] = [];
        for (let i = 0; i < zipBuffer.length - 30; i++) {
            if (zipBuffer[i] === sig[0] && zipBuffer[i+1] === sig[1] &&
                zipBuffer[i+2] === sig[2] && zipBuffer[i+3] === sig[3]) {
                const method = zipBuffer.readUInt16LE(i + 8);
                const compressedSize = zipBuffer.readUInt32LE(i + 18);
                // Only consider entries with actual content
                if (compressedSize > 0) {
                    compressionMethods.push(method);
                }
            }
        }

        expect(compressionMethods.length).toBeGreaterThan(0);
        
        // Original code: store:true means method should be 0 (stored/uncompressed)
        // Mutated code: {} means archiver uses deflate, method should be 8
        compressionMethods.forEach(method => {
            expect(method).toBe(0);
        });

        // Cleanup
        fs.rmSync(tmpDir, { recursive: true });
    });
});