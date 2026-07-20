import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP uncompressed compression method', () => {
    it('uncompressed zip entries should use stored method (0), not deflated (8)', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-method-test-'));
        const tmpZip = path.join(os.tmpdir(), 'test_method_check.zip');

        try {
            // Use random-ish data large enough to avoid any auto-store optimization
            // but with enough repetition that deflate level 0 would still use method 8
            const content = Buffer.alloc(50000);
            for (let i = 0; i < content.length; i++) {
                content[i] = (i * 37 + 13) % 256;
            }
            fs.writeFileSync(path.join(tmpDir, 'data.bin'), content);

            await ZipAFolder.zip(tmpDir, tmpZip, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });

            const buf = fs.readFileSync(tmpZip);
            
            // Find End of Central Directory record (PK\x05\x06)
            const eocdSig = Buffer.from([0x50, 0x4b, 0x05, 0x06]);
            const eocdIdx = buf.lastIndexOf(eocdSig);
            expect(eocdIdx).toBeGreaterThan(0);
            
            // Central directory offset is at EOCD + 16
            const cdOffset = buf.readUInt32LE(eocdIdx + 16);
            
            // Central directory file header signature: PK\x01\x02
            const cdSig = Buffer.from([0x50, 0x4b, 0x01, 0x02]);
            const cdIdx = buf.indexOf(cdSig, cdOffset);
            expect(cdIdx).toBeGreaterThan(0);
            
            // Compression method in central directory is at offset +10 from signature
            const compressionMethod = buf.readUInt16LE(cdIdx + 10);
            
            // store:true => method 0 (STORED)
            // zlib:{level:0} => method 8 (DEFLATED)
            expect(compressionMethod).toBe(0);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
            if (fs.existsSync(tmpZip)) fs.unlinkSync(tmpZip);
        }
    });
});