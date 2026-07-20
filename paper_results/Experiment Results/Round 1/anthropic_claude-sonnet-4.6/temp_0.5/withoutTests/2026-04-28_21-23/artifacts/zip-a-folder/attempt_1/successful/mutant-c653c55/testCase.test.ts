import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';

describe('ZipAFolder uncompressed zip', () => {
    it('should create a zip with stored (uncompressed) entries when compression level is uncompressed', async () => {
        // Create a temp directory with a test file
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const outDir = path.join(tmpDir, 'out');
        
        fs.mkdirSync(srcDir);
        fs.mkdirSync(outDir);
        
        // Create a test file with some content
        const testContent = 'Hello World! This is test content that should be stored without compression.'.repeat(10);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), testContent);
        
        const zipFilePath = path.join(outDir, 'output.zip');
        
        try {
            await ZipAFolder.zip(srcDir, zipFilePath, { compression: COMPRESSION_LEVEL.uncompressed });
            
            // Read the zip file and check compression method in local file header
            // ZIP local file header structure:
            // Offset 0:  signature (4 bytes) = 0x04034b50
            // Offset 4:  version needed (2 bytes)
            // Offset 6:  general purpose bit flag (2 bytes)
            // Offset 8:  compression method (2 bytes) - 0 = stored, 8 = deflated
            const zipBuffer = fs.readFileSync(zipFilePath);
            
            // Find the local file header signature
            const signature = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
            let headerOffset = -1;
            for (let i = 0; i < zipBuffer.length - 4; i++) {
                if (zipBuffer[i] === signature[0] && 
                    zipBuffer[i+1] === signature[1] && 
                    zipBuffer[i+2] === signature[2] && 
                    zipBuffer[i+3] === signature[3]) {
                    headerOffset = i;
                    break;
                }
            }
            
            expect(headerOffset).toBeGreaterThanOrEqual(0);
            
            // Read compression method at offset 8 from the local file header
            const compressionMethod = zipBuffer.readUInt16LE(headerOffset + 8);
            
            // Method 0 = STORED (no compression), Method 8 = DEFLATED
            // Original code uses store: true, so method should be 0
            expect(compressionMethod).toBe(0);
        } finally {
            // Cleanup
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});