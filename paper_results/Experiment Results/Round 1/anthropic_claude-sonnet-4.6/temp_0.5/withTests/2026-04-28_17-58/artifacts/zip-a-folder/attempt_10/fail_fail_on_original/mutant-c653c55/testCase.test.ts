import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";

describe('ZIP store option', () => {
    it('should produce zip where compressed size equals uncompressed size when store:true is set', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-store-'));
        const srcDir = path.join(tmpDir, 'src');
        fs.mkdirSync(srcDir);
        
        const content = 'hello world '.repeat(1000);
        fs.writeFileSync(path.join(srcDir, 'data.txt'), content);

        const zipFile = path.join(tmpDir, 'output.zip');
        await ZipAFolder.zip(srcDir, zipFile, { compression: COMPRESSION_LEVEL.high });
        
        const buf = fs.readFileSync(zipFile);
        
        // Find data descriptor (PK\x07\x08) which contains actual compressed/uncompressed sizes
        // Data descriptor: signature(4) + crc32(4) + compressedSize(4) + uncompressedSize(4)
        let compressedSize = -1;
        let uncompressedSize = -1;
        for (let i = 0; i <= buf.length - 16; i++) {
            if (buf[i] === 0x50 && buf[i+1] === 0x4b && buf[i+2] === 0x07 && buf[i+3] === 0x08) {
                compressedSize = buf.readUInt32LE(i + 8);
                uncompressedSize = buf.readUInt32LE(i + 12);
                break;
            }
        }
        
        expect(compressedSize).toBeGreaterThan(0);
        // With store:true: compressedSize == uncompressedSize (no compression)
        // Without store:true: compressedSize < uncompressedSize (deflated)
        expect(compressedSize).toBe(uncompressedSize);

        fs.rmSync(tmpDir, { recursive: true });
    });
});