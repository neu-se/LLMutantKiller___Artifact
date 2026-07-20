import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts";

describe('ZIP store option', () => {
    it('should set compression method to STORE (0) in ZIP local file header when store:true is in archiverOptions', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-store-'));
        const srcDir = path.join(tmpDir, 'src');
        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'data.txt'), 'hello world '.repeat(1000));

        const zipFile = path.join(tmpDir, 'output.zip');
        await ZipAFolder.zip(srcDir, zipFile, { compression: COMPRESSION_LEVEL.high });
        
        const buf = fs.readFileSync(zipFile);
        
        // Find ZIP local file header signature: 0x50 0x4b 0x03 0x04
        let compressionMethod = -1;
        for (let i = 0; i < buf.length - 10; i++) {
            if (buf[i] === 0x50 && buf[i+1] === 0x4b && buf[i+2] === 0x03 && buf[i+3] === 0x04) {
                compressionMethod = buf[i+8] | (buf[i+9] << 8);
                break;
            }
        }
        
        expect(compressionMethod).not.toBe(-1); // found a local file header
        // Original (store:true): compression method = 0 (STORE)
        // Mutated (no store:true): compression method = 8 (DEFLATE)
        expect(compressionMethod).toBe(0);

        fs.rmSync(tmpDir, { recursive: true });
    });
});