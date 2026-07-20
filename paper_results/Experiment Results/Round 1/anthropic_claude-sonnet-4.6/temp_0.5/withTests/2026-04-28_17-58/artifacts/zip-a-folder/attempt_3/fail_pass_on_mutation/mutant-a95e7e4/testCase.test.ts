import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder uncompressed zip uses STORE method', () => {
    it('should produce a zip where compressed size equals uncompressed size for each entry when COMPRESSION_LEVEL.uncompressed is used', async () => {
        // Create a temp directory with a known compressible text file
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const testFile = path.join(tmpDir, 'test.txt');
        // Write highly compressible content
        fs.writeFileSync(testFile, 'A'.repeat(10000));
        
        const outputZip = path.join(os.tmpdir(), 'test_store_check.zip');

        try {
            await ZipAFolder.zip(tmpDir, outputZip, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });

            const zipBuffer = fs.readFileSync(outputZip);
            
            // Parse ZIP local file headers to check compressed vs uncompressed sizes
            // Local file header: PK\x03\x04
            // offset 18: compressed size (4 bytes LE)
            // offset 22: uncompressed size (4 bytes LE)
            // offset 8: compression method (2 bytes LE) - 0=STORE, 8=DEFLATE
            const PK_LOCAL = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
            
            let offset = 0;
            let foundEntry = false;
            let allEntriesAreStore = true;
            
            while (offset <= zipBuffer.length - 30) {
                if (zipBuffer[offset] === PK_LOCAL[0] &&
                    zipBuffer[offset + 1] === PK_LOCAL[1] &&
                    zipBuffer[offset + 2] === PK_LOCAL[2] &&
                    zipBuffer[offset + 3] === PK_LOCAL[3]) {
                    
                    const compressionMethod = zipBuffer.readUInt16LE(offset + 8);
                    foundEntry = true;
                    
                    if (compressionMethod !== 0) {
                        allEntriesAreStore = false;
                    }
                    
                    const fileNameLength = zipBuffer.readUInt16LE(offset + 26);
                    const extraFieldLength = zipBuffer.readUInt16LE(offset + 28);
                    const compressedSize = zipBuffer.readUInt32LE(offset + 18);
                    offset += 30 + fileNameLength + extraFieldLength + compressedSize;
                } else {
                    offset++;
                }
            }
            
            expect(foundEntry).toBe(true);
            // Original code: store:true => compression method 0 (STORE) for all entries
            // Mutated code: zlib:{level:0} => compression method 8 (DEFLATE) for all entries
            expect(allEntriesAreStore).toBe(true);
        } finally {
            if (fs.existsSync(outputZip)) fs.unlinkSync(outputZip);
            if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
            if (fs.existsSync(tmpDir)) fs.rmdirSync(tmpDir);
        }
    });
});