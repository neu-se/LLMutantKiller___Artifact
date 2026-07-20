import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP store option', () => {
    it('should use store compression method (0) when store:true is set in archiverOptions', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-store-'));
        const srcDir = path.join(tmpDir, 'src');
        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'data.txt'), 'a'.repeat(10000));

        const zipFile = path.join(tmpDir, 'output.zip');
        await ZipAFolder.zip(srcDir, zipFile, { compression: COMPRESSION_LEVEL.high });
        
        // Read the ZIP file and check compression method in local file header
        // ZIP local file header: signature(4) + version(2) + flags(2) + compression_method(2) + ...
        // Compression method 0 = stored, 8 = deflated
        const buf = fs.readFileSync(zipFile);
        // Find local file header signature: PK\x03\x04
        const sig = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
        let offset = buf.indexOf(sig);
        const compressionMethod = buf.readUInt16LE(offset + 8);
        
        // Original (store:true): method should be 0 (stored)
        // Mutated (no store:true): method should be 8 (deflated)
        expect(compressionMethod).toBe(0);

        fs.rmSync(tmpDir, { recursive: true });
    });
});